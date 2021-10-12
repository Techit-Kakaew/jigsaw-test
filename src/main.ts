import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/scss/bootstrap.scss'
import '@/assets/sass/main.scss'
import HeaderLayout from '@/components/utils/HeaderLayout.vue'

const app = createApp(App)

app.component('HeaderLayout', HeaderLayout)

app.use(router).mount('#app')
