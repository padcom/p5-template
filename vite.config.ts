import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    eslint(),
  ],
  build: {
    chunkSizeWarningLimit: 2 * 1024 * 1024,
  },
})
