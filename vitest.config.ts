import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'


export default defineConfig({
  plugins: [
    vue()
  ],
  test: {
    coverage: {
      provider: 'istanbul',
      exclude: ['src/main.ts']
    },
    environment: 'happy-dom'
  }
})