/// <reference types="vitest" />
import { resolve } from 'path'
// import { fileURLToPath, URL } from 'url'
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
    vue(
      // {
      //   template: {
      //     compilerOptions: {
      //       isCustomElement: (tag) => ['router-link'].includes(tag)
      //     }
      //   }
      // }
    )
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  base: './',
  build: {
    outDir: './dist',
    assetsDir: '.', 
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js', 
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: assetInfo => {
          const extType = assetInfo.name?.split('.').at(1)
          if (/\.(png|jpe?g|gif|svg|webp|webm|mp3)$/.test(String(assetInfo.name))) {
            return `media/[name]-[hash].${extType}`
          }
          if (/\.(css)$/.test(String(assetInfo.name))) {
            return `css/[name]-[hash].${extType}`
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(String(assetInfo.name))) {
            return `fonts/[name]-[hash].${extType}`
          }
          return `[name]-[hash].${extType}`
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    }
  }
})
