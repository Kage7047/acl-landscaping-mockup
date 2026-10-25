import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://<user>.github.io/acl-landscaping-mockup/
export default defineConfig({
  base: '/acl-landscaping-mockup/',
  plugins: [react()],
  build: { chunkSizeWarningLimit: 700 },
})
