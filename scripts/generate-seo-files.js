import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { WORKS_GALLERY } from '../src/data/interiorGallery.js';

const DEFAULT_SITE_URL = 'https://duromaker.vercel.app';

function getSiteOrigin(siteUrl) {
  let url;
  try {
    url = new URL(siteUrl);
  } catch {
    console.warn(`Invalid VITE_SITE_URL "${siteUrl}", falling back to ${DEFAULT_SITE_URL}`);
    url = new URL(DEFAULT_SITE_URL);
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    url = new URL(DEFAULT_SITE_URL);
  }

  return url.origin;
}

async function generateSeoFiles() {
  const configuredSiteUrl = process.env.VITE_SITE_URL || DEFAULT_SITE_URL;
  const siteOrigin = getSiteOrigin(configuredSiteUrl);
  const today = new Date().toISOString().split('T')[0];

  const mainPages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/services', priority: '0.9', changefreq: 'monthly' },
    { path: '/works', priority: '0.9', changefreq: 'weekly' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/store', priority: '0.8', changefreq: 'monthly' },
    { path: '/contact', priority: '0.8', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  ];

  const galleryPages = WORKS_GALLERY.map((entry) => ({
    path: `/works/${encodeURIComponent(entry.id)}`,
    priority: '0.6',
    changefreq: 'monthly',
  }));

  const allPages = [...mainPages, ...galleryPages];

  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...allPages.map(
      (page) =>
        `  <url>\n    <loc>${siteOrigin}${page.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`,
    ),
    '</urlset>',
    '',
  ].join('\n');

  const sitemapPath = new URL('../public/sitemap.xml', import.meta.url);
  const robotsPath = new URL('../public/robots.txt', import.meta.url);

  let robots = '';
  try {
    robots = await readFile(robotsPath, 'utf8');
  } catch {
    robots = 'User-agent: *\nAllow: /\n';
  }

  const sitemapDirective = `Sitemap: ${siteOrigin}/sitemap.xml`;
  const robotsCleaned = robots.replace(/^Sitemap:.*\r?\n?/gim, '').trimEnd();
  const robotsWithSitemap = `${robotsCleaned}\n\n${sitemapDirective}\n`;

  await Promise.all([
    writeFile(sitemapPath, sitemapXml, 'utf8'),
    writeFile(robotsPath, robotsWithSitemap, 'utf8'),
  ]);

  console.log(`Generated sitemap for ${siteOrigin} with ${allPages.length} URLs (written to public/sitemap.xml).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  generateSeoFiles().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

export { generateSeoFiles };
