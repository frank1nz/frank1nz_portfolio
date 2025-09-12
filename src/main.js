import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Icon } from '@iconify/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

createApp(App).component('Icon',Icon).mount('#app')
