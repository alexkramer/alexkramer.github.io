# alexckramer.com

Personal site for Alex Kramer, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Develop

Requires Node 24 (see `.nvmrc`).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve dist/
```

## Where things live

| What | Where |
|---|---|
| Experience timeline and "How I help" | `src/data/experience.ts` |
| Homepage | `src/pages/index.astro` |
| Header, footer, meta tags | `src/layouts/Base.astro` |
| Colors, type scale, layout | `src/styles/global.css` |
| Blog posts | `src/content/posts/YYYY-MM-DD-slug.md` |
| Resume | `public/assets/resume.pdf` |
| Headshot (resized at build time) | `src/assets/headshot.jpg` |

Posts publish at `/blog/<slug>.html`; the date prefix in the filename is dropped. Front matter:

```markdown
---
title: "Post title"
description: "One sentence for listings and link previews"
date: 2026-10-10
categories: ["Security"]
---
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. The custom domain comes from `public/CNAME`.
