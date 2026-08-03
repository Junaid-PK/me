# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Local development

Use Node.js 20, then install dependencies and start Vite:

```sh
npm ci
npm run dev
```

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`. The workflow builds the
site and synchronizes `dist/` to `/opt/hijunaid/dist/` on the VPS. It can also be
run manually from the repository's Actions tab.

The workflow requires these GitHub Actions secrets:

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`
- `VPS_KNOWN_HOSTS`
