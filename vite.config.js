import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import taillwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [react(), taillwindcss()],
  resolve: {
    alias: {
      '#components': resolve(dirname(fileURLToPath(import.meta.url)), 'src/components'),
      '#constants': resolve(dirname(fileURLToPath(import.meta.url)), 'src/constants'),
      '#store': resolve(dirname(fileURLToPath(import.meta.url)), 'src/store'),
      '#hoc': resolve(dirname(fileURLToPath(import.meta.url)), 'src/hoc'),
      '#windows': resolve(dirname(fileURLToPath(import.meta.url)), 'src/windows'),
      '#hooks': resolve(dirname(fileURLToPath(import.meta.url)), 'src/hooks'),
      '#context': resolve(dirname(fileURLToPath(import.meta.url)), 'src/context'),
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            if (id.includes('/src/DesktopApp')) return 'desktop';
            if (id.includes('/src/components/MobileHome')) return 'mobile';
            if (id.includes('/src/windows/')) return 'windows';
            return;
          }

          if (id.includes('react-pdf') || id.includes('pdfjs-dist')) return 'vendor-pdf';
          if (id.includes('gsap')) return 'vendor-gsap';
          if (id.includes('react-dom') || id.includes('/react/')) return 'vendor-react';
        },
      },
    },
  },
})
