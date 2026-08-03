# hijunaid.com

Junaid Hussnain's engineering portfolio and notes. The site is built with Vue,
TypeScript, Vite, and static generation so its primary content is available to
people and search crawlers without client-side rendering.

[Visit hijunaid.com](https://hijunaid.com) · [About Junaid](https://hijunaid.com/about) · [Read the engineering notes](https://hijunaid.com/blog) · [Subscribe via RSS](https://hijunaid.com/rss.xml)

[![Deploy website](https://github.com/Junaid-PK/me/actions/workflows/deploy.yml/badge.svg)](https://github.com/Junaid-PK/me/actions/workflows/deploy.yml)

## What this repository demonstrates

- Route-level static generation for the portfolio, dedicated professional profile, notes index, and every Markdown article.
- Canonical URLs, Open Graph metadata, `ProfilePage`, `Person`, `WebSite`, and `BlogPosting` structured data.
- Sitemap and RSS generation from the same article frontmatter used by the application.
- IndexNow notification for every deployed public route.
- A least-privilege VPS deployment that synchronizes static assets, validates nginx, and reloads only the portfolio service.
- Production assertions for security headers, author identity markup, the dedicated profile route, and RSS authorship.

## Local development

Use Node.js 20, then install dependencies and start Vite:

```sh
npm ci
npm run dev
```

Create the production output with `npm run build`. The generated pages are
written to `dist/`. The build also regenerates `public/sitemap.xml` and
`public/rss.xml` from the Markdown content in `src/content/blog/`.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`. The workflow builds the
site and synchronizes `dist/` to `/opt/hijunaid/dist/` on the VPS. It can also be
run manually from the repository's Actions tab.

Before a deployment is accepted, the workflow verifies the live security
headers, structured identity graph, and feed authorship. Successful releases
then submit the generated route list to IndexNow.

The workflow requires these GitHub Actions secrets:

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`
- `VPS_KNOWN_HOSTS`
