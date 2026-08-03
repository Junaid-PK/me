import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import 'vite-ssg'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    includedRoutes: () => [
      '/',
      '/blog',
      '/blog/building-big-software-that-stays-small',
      '/blog/blazingly-fast-tech-stack-for-million-dollar-project',
      '/blog/when-leading-feels-lonely',
      '/blog/leading-when-you-are-not-the-loudest-in-the-room',
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
