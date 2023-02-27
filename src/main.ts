import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'

import App from './App.vue'
import routes from '~pages'

import '@unocss/reset/eric-meyer.css'
import 'uno:components.css'
import 'uno.css'
import './assets/main.css'
import 'virtual:unocss-devtools'
import 'uno:utilities.css'


export const createApp = ViteSSG(App, { routes }, async ({ app, isClient }) => {
  if (isClient) {
    const Vue3TouchEvents = await import('vue3-touch-events')
    app.use(Vue3TouchEvents.default)
  }
})

