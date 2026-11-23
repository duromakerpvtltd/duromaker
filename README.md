
# Duro Maker Interiors

## SEO and analytics deployment settings

Set these variables in Vercel under **Project Settings → Environment Variables**, then redeploy:

- `VITE_SITE_URL`: the canonical HTTPS origin (for example, `https://www.example.com`). The build uses it to generate `sitemap.xml` for the main pages and all gallery reference pages, and adds the sitemap URL to `robots.txt`. If it is unset, the build skips sitemap generation.
- `VITE_GA_MEASUREMENT_ID`: your Google Analytics 4 measurement ID (`G-...`). Google Analytics page-view tracking stays off until a valid ID is configured. Vercel Analytics is also enabled separately.

For local development, copy `.env.example` to `.env` and fill in the values. Never commit `.env`.

## Shared UI design skill

The `unslop` skill is installed in this repository for GitHub Copilot, Codex, Antigravity, and other `.agents/skills`-compatible tools, plus Claude Code. Commit the project copies and `skills-lock.json` so teammates get the same skill when they clone the repository. Ask a compatible agent to use `unslop` when refining the interface.

- Source: [heydamir/unslop](https://github.com/heydamir/unslop)
- Author: Damir Sokolovsky ([@heydamir](https://x.com/heydamir))
- License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- Update the project copy with `npx skills update unslop` from the repository root.
