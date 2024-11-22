import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Doctors = () => import('./views/Doctors.vue')
const Nurses = () => import('./views/Nurses.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/doctors'
  },
  {
    path: '/doctors',
    name: 'Doctors',
    component: Doctors
  },
  {
    path: '/nurses',
    name: 'Nurses',
    component: Nurses
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
