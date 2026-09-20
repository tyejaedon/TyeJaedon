import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // GitHub Pages project site path; override with VITE_BASE when deploying elsewhere.
  base: process.env.VITE_BASE ?? '/TyeJaedon/',
})
