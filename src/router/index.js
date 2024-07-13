import { createRouter, createWebHistory } from 'vue-router'

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
      path: '/dashboard',
      name: 'dashboard',
      component: ()=> import('../views/dashboard/DashboardView.vue')
    },        
  ]
})

router.beforeEach(async (to, from, next) => {

  if (to.matched.some(record => record.meta.auth)) {
    if (!store.refreshToken) {
      next('/auth'); // Redirige si no hay refreshToken
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
