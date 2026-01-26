import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import taillwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [react(), taillwindcss()],
  resolve: {
    alias: {
      '#components': resolve(dirname(fileURLToPath(import.meta.url)), 'components'),
      '#constants': resolve(dirname(fileURLToPath(import.meta.url)), 'constants'),
      '#store': resolve(dirname(fileURLToPath(import.meta.url)), 'store'),
      '#hoc': resolve(dirname(fileURLToPath(import.meta.url)), 'hoc'),
      '#windows': resolve(dirname(fileURLToPath(import.meta.url)), 'windows'),
    }
  }
})
