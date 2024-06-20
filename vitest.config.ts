import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    vue()
  ],
  test: {
    coverage: {
      provider: 'istanbul',
      exclude: ['src/main.ts','src/App.vue','src/router/router.ts']
    },
    environment: 'happy-dom',
    globals: true,
  },
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': resolve(__dirname, 'src')
    }
  },
})