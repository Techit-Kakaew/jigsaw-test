import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'contact-parent',
    redirect: '/contact',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('@/views/Contact.vue')
      },
      {
        path: '/report',
        name: 'report',
        component: () => import('@/views/Report.vue')
      },
      {
        path: '/manage-layout',
        name: 'manage-layout',
        component: () => import('@/views/setting/ManageLayout.vue')
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('@/views/setting/Member.vue')
      },
      {
        path: '/data-access',
        name: 'data-access',
        component: () => import('@/views/setting/DataAccess.vue')
      },
      {
        path: '/system-log',
        name: 'system-log',
        component: () => import('@/views/setting/SystemLog.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
