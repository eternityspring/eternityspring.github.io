import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.VERCEL ? '/' : '/dist/',
  server: {
    port: 3099,
  },
})
