
# Duro Maker Interiors

## SEO and analytics deployment settings

Set these variables in Vercel under **Project Settings → Environment Variables**, then redeploy:

- `VITE_SITE_URL`: the canonical HTTPS origin (for example, `https://www.example.com`). The build uses it to generate `sitemap.xml` for the main pages and all gallery reference pages, and adds the sitemap URL to `robots.txt`. If it is unset, the build skips sitemap generation.
- `VITE_GA_MEASUREMENT_ID`: your Google Analytics 4 measurement ID (`G-...`). Google Analytics page-view tracking stays off until a valid ID is configured. Vercel Analytics is also enabled separately.

For local development, copy `.env.example` to `.env` and fill in the values. Never commit `.env`.
