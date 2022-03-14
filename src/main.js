import { createApp } from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
loadFonts()

import router from './router'
import store from "./store"
import {registerEvents} from '../bridge/bridge.js'
registerEvents(store)

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
