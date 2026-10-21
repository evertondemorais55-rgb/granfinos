import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/granfinos/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Em desenvolvimento, /api vai para o backend local (pasta backend/, npm run dev).
    proxy: {
      '/api': 'http://localhost:3333',
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
