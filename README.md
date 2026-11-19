# duromaker

## Cloudflare Workers deployment

Wrangler serves the production build from `dist/` and uses Cloudflare's single-page-application fallback for React Router routes. Build the site before deploying. Do not add a catch-all `_redirects` rule to send every path to `/index.html`, because Workers can detect it as a redirect loop.

## Interior image library

Interior photography is catalogued in `src/data/interiorGallery.js`. Each entry records its display title, category, descriptions, alt text, orientation, Pexels source page, and Pexels License link. The original source images are stored locally as optimized 640px and 1600px WebP files in `public/images/interiors/`.

All third-party photographs are inspiration references only. They must not be presented as completed DURO MAKER projects, staff, or stocked products. Product catalogue images do not imply verified materials, prices, or availability. `src/components/InteriorImage.jsx` provides responsive image sizes and a local fallback.