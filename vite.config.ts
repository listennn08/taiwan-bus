import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa'
import ViteSSR from 'vite-ssr/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Unocss(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      // global imports to register
      imports: [
        'vue',
        'vue-router',
        {
          '@vueuse/core': [
            'onClickOutside',
            'useFetch',
            'createFetch',
            'useLocalStorage',
            'useIntervalFn',
          ],
          '@vueuse/head': ['useHead'],
        },
        {
          'lodash-es': ['get', 'cloneDeep', 'omitBy'],
        },
      ],
      dts: true,
      defaultExportByFilename: true,
      dirs: ['./src/composables/**'],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dts: true,
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      version: 3,
    }),
    Pages(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      manifest: {
        // APP 名稱
        name: 'Taiwan Bus Search',
        short_name: 'Bus Search',
        // APP 說明
        description: 'Search all buses by city in Taiwan',
        // APP 主題顏色
        theme_color: '#FFFBF2',
        // APP 顯示範圍
        scope: './',
        // APP 開始畫面網址
        start_url: './',
        // 顯示模式
        // browser: 瀏覽器
        // fullscreen: 全螢幕，隱藏所有瀏覽器 UI
        // standalone: 隱藏標準瀏覽器 UI ，如 URL 欄
        // minimal-ui: 有最小導覽列 UI
        display: 'standalone',
        // icon 路徑，./ 代表 public
        icons: [
          {
            src: 'favicon.ico',
            sizes: '180x180',
            type: 'image/ico',
          },
        ],
      },
    }),
    ViteSSR(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
