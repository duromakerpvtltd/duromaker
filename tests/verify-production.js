import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

console.log('='.repeat(70));
console.log('  DURO MAKER INTERIORS - PRODUCTION DEPLOYMENT VERIFICATION SUITE');
console.log('='.repeat(70));

let failures = 0;
let passes = 0;

function check(title, condition, details = '') {
  if (condition) {
    passes++;
    console.log(`  [PASS] ${title}`);
  } else {
    failures++;
    console.error(`  [FAIL] ${title} - ${details}`);
  }
}

// 1. Health check endpoint test
const healthPath = path.join(rootDir, 'public', 'health.json');
check('Health check endpoint exists', fs.existsSync(healthPath), 'Missing public/health.json');
if (fs.existsSync(healthPath)) {
  try {
    const healthData = JSON.parse(fs.readFileSync(healthPath, 'utf8'));
    check('Health check contains status: healthy/ok', healthData.status === 'healthy' || healthData.status === 'ok', `status was ${healthData.status}`);
  } catch (err) {
    check('Health check JSON is valid', false, err.message);
  }
}

// 2. Sitemap and Robots.txt test
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
check('Sitemap exists', fs.existsSync(sitemapPath), 'Missing public/sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  check('Sitemap is valid XML and contains URLs', sitemapContent.includes('<urlset') && sitemapContent.includes('<loc>'), 'Invalid sitemap XML');
  check('Sitemap includes canonical domain', sitemapContent.includes('duromaker.vercel.app'), 'Missing target domain in sitemap');
}

const robotsPath = path.join(rootDir, 'public', 'robots.txt');
check('Robots.txt exists', fs.existsSync(robotsPath), 'Missing public/robots.txt');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  check('Robots.txt references sitemap.xml', robotsContent.includes('Sitemap:'), 'Robots.txt missing Sitemap declaration');
}

// 3. Security headers test
const vercelPath = path.join(rootDir, 'vercel.json');
check('vercel.json exists', fs.existsSync(vercelPath), 'Missing vercel.json');
if (fs.existsSync(vercelPath)) {
  try {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
    const globalHeaders = vercelConfig.headers?.find(h => h.source === '/(.*)')?.headers || [];
    const headerKeys = globalHeaders.map(h => h.key.toLowerCase());

    check('HSTS configured with preload', globalHeaders.some(h => h.key === 'Strict-Transport-Security' && h.value.includes('preload')), 'HSTS missing or lacks preload');
    check('X-Content-Type-Options: nosniff present', headerKeys.includes('x-content-type-options'), 'Missing nosniff');
    check('X-Frame-Options: DENY present', headerKeys.includes('x-frame-options'), 'Missing X-Frame-Options');
    check('Referrer-Policy present', headerKeys.includes('referrer-policy'), 'Missing Referrer-Policy');
    check('Permissions-Policy present', headerKeys.includes('permissions-policy'), 'Missing Permissions-Policy');
    check('Content-Security-Policy present', headerKeys.includes('content-security-policy'), 'Missing Content-Security-Policy');
  } catch (err) {
    check('vercel.json is valid JSON', false, err.message);
  }
}

// 4. index.html SEO, Social & Schema.org verification
const indexPath = path.join(rootDir, 'index.html');
check('index.html exists', fs.existsSync(indexPath), 'Missing index.html');
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  check('Viewport meta configured', indexContent.includes('name="viewport"'), 'Missing viewport meta');
  check('Meta description present', indexContent.includes('name="description"'), 'Missing meta description');
  check('Canonical link present', indexContent.includes('rel="canonical"'), 'Missing canonical tag');
  check('OpenGraph meta tags present', indexContent.includes('property="og:title"'), 'Missing OpenGraph tags');
  check('Twitter card meta tags present', indexContent.includes('name="twitter:card"'), 'Missing Twitter Card tags');
  check('Schema.org JSON-LD markup present', indexContent.includes('application/ld+json'), 'Missing JSON-LD structured data');
}

// 5. Build output test (if dist exists)
const distPath = path.join(rootDir, 'dist');
if (fs.existsSync(distPath)) {
  check('dist/index.html generated', fs.existsSync(path.join(distPath, 'index.html')), 'Missing dist/index.html');
}

console.log('='.repeat(70));
console.log(`Summary: ${passes} passed, ${failures} failed.`);
console.log('='.repeat(70));

if (failures > 0) {
  process.exit(1);
} else {
  console.log('All production verification checks PASSED.\n');
  process.exit(0);
}
