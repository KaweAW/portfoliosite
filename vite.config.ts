import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { seoPlugin } from './vite-plugins/seo'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin()],
})
