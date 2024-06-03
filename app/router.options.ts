import type { RouterConfig } from '@nuxt/schema'
export default <RouterConfig> {
  routes: () => [
    {
      name: 'Home',
      path: '/',
      component: () => import('~/pages/Home/index.vue')
    },
    {
      name: 'Details',
      path: '/Details',
      component: () => import('~/pages/Details/index.vue')
    },
  ]
}
