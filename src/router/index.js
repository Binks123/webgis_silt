import Vue from 'vue'
import VueRouter from 'vue-router'
import Slider from '@/components/Slider.vue'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: '/home'
  },
  {
    path: '/slider',
    component: Slider
  },

]

const router = new VueRouter({
  routes
})

export default router
