import {
  createApp
} from 'vue'
import Main from './main.vue'
import router from './router'
import './assets/main.css'

const app = createApp(Main)

app.use(router)

app.mount('#app')