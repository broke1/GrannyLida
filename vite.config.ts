/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'



export default defineConfig({
  plugins: [
    eslint({
      include: ['src/**/*.vue', 'src/**/*.ts'],
      exclude: ['./node_modules/**'],
      cache: false
    }),
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
