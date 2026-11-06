import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import seoPlugin from './vite-seo-plugin.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin()],
  base: '/',
  // Allow the sandbox/preview proxy hosts (and any custom domain) to reach the
  // dev server; otherwise Vite answers 403 "Blocked request. This host ...".
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  build: {
    // Vite 8 uses rolldown, where `manualChunks` must be a function (the object
    // form silently fails the build). Splitting the big vendors keeps the
    // initial payload small and the app cache-friendly.
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(id)) {
            return 'react-vendor'
          }
          if (id.includes('lucide-react')) return 'ui-vendor'
          if (id.includes('@googlemaps')) return 'maps-vendor'
          if (/(axios|zod|react-hook-form|@hookform|jalaali-js)/.test(id)) return 'utils-vendor'
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
