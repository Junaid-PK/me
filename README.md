# hijunaid.com

Junaid Hussnain's engineering portfolio and notes. The site is built with Vue,
TypeScript, Vite, and static generation so its primary content is available to
people and search crawlers without client-side rendering.

## Local development

Use Node.js 20, then install dependencies and start Vite:

```sh
npm ci
npm run dev
```

Create the production output with `npm run build`. The generated pages are
written to `dist/`.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`. The workflow builds the
site and synchronizes `dist/` to `/opt/hijunaid/dist/` on the VPS. It can also be
run manually from the repository's Actions tab.

The workflow requires these GitHub Actions secrets:

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`
- `VPS_KNOWN_HOSTS`
