import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { WORKS_GALLERY } from '../src/data/interiorGallery.js';

function getSiteOrigin(siteUrl) {
  let url;
  try {
    url = new URL(siteUrl);
  } catch {
    throw new Error('VITE_SITE_URL must be a valid HTTPS origin, such as https://www.example.com');
  }

  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('VITE_SITE_URL must be an HTTPS origin without a path, query, or fragment');
  }

  return url.origin;
}

async function generateSeoFiles() {
  const configuredSiteUrl = process.env.VITE_SITE_URL;
  if (!configuredSiteUrl) {
    const robotsPath = new URL('../public/robots.txt', import.meta.url);
    const robots = await readFile(robotsPath, 'utf8');
    const robotsWithoutSitemap = `${robots.replace(/^Sitemap:.*\r?\n?/gim, '').trimEnd()}\n`;
    await Promise.all([
      rm(new URL('../public/sitemap.xml', import.meta.url), { force: true }),
      writeFile(robotsPath, robotsWithoutSitemap),
    ]);
    console.warn('VITE_SITE_URL is not set; sitemap generation skipped.');
    return;
  }

  const siteOrigin = getSiteOrigin(configuredSiteUrl);
  const routes = [
    '/',
    '/about',
    '/services',
    '/works',
    '/store',
    '/contact',
    ...WORKS_GALLERY.map((entry) => `/works/${encodeURIComponent(entry.id)}`),
  ];
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((route) => `  <url><loc>${siteOrigin}${route}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');

  const robotsPath = new URL('../public/robots.txt', import.meta.url);
  const robots = await readFile(robotsPath, 'utf8');
  const robotsWithSitemap = `${robots.replace(/^Sitemap:.*\r?\n?/gim, '').trimEnd()}\n\nSitemap: ${siteOrigin}/sitemap.xml\n`;

  await Promise.all([
    writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap),
    writeFile(robotsPath, robotsWithSitemap),
  ]);
  console.log(`Generated sitemap for ${siteOrigin} with ${routes.length} URLs.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  generateSeoFiles().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
