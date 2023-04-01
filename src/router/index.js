import { createRouter, createWebHistory } from 'vue-router'

import App from '../App.vue';
import MsTeam from '../ms-team/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App
    },
    {
      path: '/ms-team',
      name: 'ms-team',
      component: MsTeam
    },
  ]
})

export default router
