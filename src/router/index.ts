import { createRouter, createWebHistory } from 'vue-router'
import DashboardPrincipal from '@/views/DashboardPrincipal.vue'
import LoginRegister from '@/views/LoginRegister.vue'

import DashboardUsers from '@/components/users/DashboardUsers.vue'
import DashboardOrders from '@/components/orders/DashboardOrders.vue'
import DataTableProducts from '@/components/products/DataTableProducts.vue'
import DashboardProducts from '@/views/DashboardProducts.vue'
import ListProducts from '@/components/products/ListProducts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginRegister,
    },
    {
      path: '/home',
      name: 'dashboard',
      component: DashboardPrincipal,
    },
    {
      path: '/products',
      name: 'products',
      component: DashboardProducts,
    },
    {
      path: '/products/panel',
      name: 'productsTable',
      component: DataTableProducts,
    },
    {
      path: '/products/view',
      name: 'productsView',
      component: ListProducts,
    },
    {
      path: '/orders',
      name: 'orders',
      component: DashboardOrders,
    },
    {
      path: '/users',
      name: 'users',
      component: DashboardUsers,
    },
  ],
})

export default router
