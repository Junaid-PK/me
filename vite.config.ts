import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import 'vite-ssg'
import { readdirSync } from 'node:fs'

const blogRoutes = readdirSync(new URL('./src/content/blog/', import.meta.url))
  .filter((filename) => filename.endsWith('.md'))
  .map((filename) => `/blog/${filename.replace(/\.md$/, '')}`)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    includedRoutes: () => [
      '/',
      '/blog',
      ...blogRoutes,
    ],
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
})
