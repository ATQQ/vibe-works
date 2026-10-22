import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'theme',
    },
    rollupOptions: {
      external: [
        'vue',
        'vitepress',
        'naive-ui',
        '@css-render/vue3-ssr',
        /^vue\//,
        /^vitepress\//,
        /^naive-ui\//,
      ],
    },
    emptyOutDir: true,
    cssCodeSplit: false,
  },
})
