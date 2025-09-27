# SEO Reporting & Backlinking Guide

This guide consolidates all commands, pages, and file locations for blog posting, SERP reporting, backlink tracking, and templates used for SEO.

## Blog Posts

- Command:
  - `yarn blog:post <path-to-json>`
- Behavior:
  - Write-time dedupe by id or normalized title
  - Read-time dedupe by normalized title, keeping newest
- Data file:
  - `public/blog-posts.json`
- App pages:
  - Blog list: `/blog`
  - Blog detail: `/blog/:id`

## SERP Reports (Manual, No API)

- Generate search links CSV:
  - `yarn serp:manual`
- Outputs:
  - Timestamped CSVs: `reports/serp/manual_serp_links-YYYYMMDD-hhmmss.csv`
  - Pointer CSV: `reports/serp/manual_serp_links.csv`
  - Manifest: `reports/serp/manifest.json`
- Open links in browser (manual checks):
  - `yarn serp:open [--engine google_zhCN|google_zhTW|bing_zhHK] [--file <csv>] [--limit N] [--delay ms]`
- Optional SERP API mode (disabled by default):
  - `yarn serp:manual --with-api` (requires env `SERPAPI_KEY`)
  - Writes JSON results next to CSV and updates manifest
- App page:
  - `/serp-report` (dropdown lists all runs via manifest)
- Keywords file:
  - `scripts/serp_keywords.json` (expanded with long-tail/competitor terms)

## Backlink Tracking

- Add a backlink (track what you earned):
  - `yarn backlink:add --url "<url>" --domain "<domain>" --type <manual|guest|directory|social|partnership> --quality <high|medium|low> [--anchor "text"] [--notes "note"]`
- Reports (terminal):
  - `yarn backlink:report` (detailed)
  - `yarn backlink:summary` (weekly/monthly snapshot)
- Data files:
  - Manifest: `reports/backlinks/backlink_manifest.json`
  - Daily: `reports/backlinks/backlink_daily_YYYY-MM-DD.json`
- App page:
  - `/backlink-report` (select date, see totals by type/quality, links table)

## Templates (Linkable Assets for SEO)

- App pages:
  - Template library: `/templates`
  - Template detail: `/templates/:id`
- Static assets (add your files):
  - Place `.docx`, `.pptx`, `.xlsx` under `public/templates/`
  - Place preview images under `public/templates/previews/`
- Styling:
  - `src/styles/templates.css` (includes top padding to clear fixed nav)

## File & Page Map

- Blog
  - Data: `public/blog-posts.json`
  - Loader with dedupe: `src/utils/blogData.ts`
  - Pages: `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`
- SERP
  - Generator: `scripts/generate-manual-serp-links.js`
  - Link opener: `scripts/serp-open-links.js`
  - Manifest: `reports/serp/manifest.json`
  - Page: `src/pages/SerpReport.tsx`
- Backlinks
  - Tracker CLI: `scripts/backlink-tracker.js`
  - Manifest: `reports/backlinks/backlink_manifest.json`
  - Daily reports: `reports/backlinks/backlink_daily_YYYY-MM-DD.json`
  - Page: `src/pages/BacklinkReport.tsx`
- Templates
  - Pages: `src/pages/Templates.tsx`, `src/pages/TemplateDetail.tsx`
  - Styles: `src/styles/templates.css`

## Serving Reports in the App

If previewing a static build, ensure the `reports/` directory is served:

- Quick copy for static preview:
  - macOS: `cp -R ./reports ./dist/reports`

## Daily Workflow (Suggested)

1) Generate SERP links (optional, for manual checks)
- `yarn serp:manual`
- Open links for spot checks: `yarn serp:open --limit 10 --delay 1000`

2) Earn backlinks (outreach, directories, communities), then log them
- `yarn backlink:add --url "https://example.com/post" --domain "example.com" --type guest --quality high`

3) Share progress
- App pages: `/serp-report`, `/backlink-report`
- Terminal: `yarn backlink:report`, `yarn backlink:summary`

## Notes
- SERP API is optional and disabled unless you pass `--with-api` and set `SERPAPI_KEY`.
- Blog posting is id/title-deduped to prevent duplicates both at write and read time.
