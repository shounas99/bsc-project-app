import './assets/main.css'

import { createApp } from 'vue'
import { es } from 'vuetify/locale'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(
  createVuetify({
    theme: {
      themes: {
        light: {
          colors: {
            accent: '#5585bf',
            golden: '#FFB433',
            lightYellow: '#D6BD98',
            kingblue: '#27548A',
            primary: '#80CBC4',
            primaryBlue: '#074f84',
            secondary: '#f0efed',
          },
        },
      },
    },
    icons: {
      // iconfont: 'mdiSvg',
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    },
    locale: {
      locale: 'es',
      fallback: 'es',
      messages: { es },
    },
  }),
)
app.use(createPinia())
app.use(router)

app.mount('#app')
