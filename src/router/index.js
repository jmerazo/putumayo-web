import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/users'
import AdminLayout from '../views/Layouts/AdminLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'home',
        component: ()=> import('../views/HomeView.vue')
    },
    {
        path: '/auth',
        name: 'auth',
        component: ()=> import('../views/AuthView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: ()=> import('../views/RegisterView.vue')
    },
    {
      path: '',
      component: AdminLayout, // Usa tu layout para las rutas que requieren autenticación
      meta: { auth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/dashboard/DashboardView.vue'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/dashboard/Users/UsersListView.vue'),
        },
        // Agrega más rutas aquí
      ]
    }   
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = useUserStore();

  if (to.matched.some(record => record.meta.auth)) {
    if (!store.refreshToken) {
      next('/'); // Redirige si no hay refreshToken
    } else {
      if (!store.accessToken) {
        await store.rehydrateAuth(); // Intenta obtener un nuevo accessToken
      }
      next(); // Continúa si el refreshToken está presente (y ahora también el accessToken)
    }
  } else {
    next(); // Rutas que no requieren autenticación
  }
});

export default router
