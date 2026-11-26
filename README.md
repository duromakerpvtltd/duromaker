
# Duro Maker Interiors

## SEO and analytics deployment settings

Set these variables in Vercel under **Project Settings → Environment Variables**, then redeploy:

- `VITE_SITE_URL`: the canonical HTTPS origin (for example, `https://www.example.com`). The build uses it to generate `sitemap.xml` for the main pages and all gallery reference pages, and adds the sitemap URL to `robots.txt`. If it is unset, the build skips sitemap generation.
- `VITE_GA_MEASUREMENT_ID`: your Google Analytics 4 measurement ID (`G-...`). Analytics remains off until the visitor grants consent.
- `VITE_GTM_ID`: optional Google Tag Manager container ID (`GTM-...`).
- `VITE_FB_PIXEL_ID`: optional Meta Pixel ID.

For local development, copy `.env.example` to `.env` and fill in the values. Never commit `.env`.

## Run with Docker

Docker Compose builds the production Vite bundle and serves it with Nginx on port `8080` by default.

1. Copy `.env.example` to `.env` and set any site or analytics values you need:

   ```powershell
   Copy-Item .env.example .env
   ```

   These `VITE_*` values are embedded into the frontend at build time, so rebuild after changing them.
2. Build and start the site:

   ```powershell
   docker compose up --build -d
   ```

3. Open <http://localhost:8080>. To use a different host port, set `PORT` in `.env`.

Useful commands:

```powershell
docker compose logs -f
docker compose down
```

The container includes a health check at `/health.json`. For public deployments, put the container behind an HTTPS reverse proxy; the container itself serves HTTP on port 80.

## Shared UI design skill

The `unslop` skill is installed in this repository for GitHub Copilot, Codex, Antigravity, and other `.agents/skills`-compatible tools, plus Claude Code. Commit the project copies and `skills-lock.json` so teammates get the same skill when they clone the repository. Ask a compatible agent to use `unslop` when refining the interface.

- Source: [heydamir/unslop](https://github.com/heydamir/unslop)
- Author: Damir Sokolovsky ([@heydamir](https://x.com/heydamir))
- License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- Update the project copy with `npx skills update unslop` from the repository root.
