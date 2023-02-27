import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@unocss/reset/eric-meyer.css'
import 'uno:components.css'
import 'uno.css'
import './assets/main.css'
import 'virtual:unocss-devtools'
import 'uno:utilities.css'

import Vue3TouchEvents from 'vue3-touch-events'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3TouchEvents)

app.mount('#app')
