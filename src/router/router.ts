import { createWebHistory, createRouter } from 'vue-router'
import AdminPage from '@/components/AdminPage/AdminPage.vue'
import MainPage from '@/components/MainPage/MainPage.vue'


const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 150,
        behavior: 'smooth',
      }
    }
  }
})

export default router