/// <reference types="vitest" />
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
  ]
})
