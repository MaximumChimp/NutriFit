import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],build: {
    outDir: 'dist'
  },
  // 👇 This is optional if you use vercel.json, but still good for dev
  server: {
    historyApiFallback: true
  }
})
