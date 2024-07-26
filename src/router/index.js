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
      path: '/dashboard',
      component: AdminLayout, // Usa tu layout para las rutas que requieren autenticación
      meta: { auth: true },
      children: [
        {
          path: '/home',
          name: 'dashboardHome',
          component: () => import('../views/dashboard/DashboardView.vue'),
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('../views/dashboard/Users/UsersListView.vue'),
        },
        {
          path: '/dependencies',
          name: 'dependencies',
          component: () => import('../views/dashboard/Utils/DependenciesView.vue'),
        },
        {
          path: '/subdependencies',
          name: 'subdependencies',
          component: () => import('../views/dashboard/Utils/SubdependenciesView.vue'),
        },
        {
          path: '/people',
          name: 'people',
          component: () => import('../views/dashboard/Utils/PersonListView.vue'),
        },
        {
          path: '/roles',
          name: 'roles',
          component: () => import('../views/dashboard/Utils/RolesView.vue'),
        },
        {
          path: '/permissions',
          name: 'permissions',
          component: () => import('../views/dashboard/Utils/PermissionsView.vue'),
        },
        {
          path: '/modules',
          name: 'modules',
          component: () => import('../views/dashboard/Utils/ModulesView.vue'),
        },
        {
          path: '/submodules',
          name: 'submodules',
          component: () => import('../views/dashboard/Utils/SubmodulesView.vue'),
        },
        {
          path: '/groups',
          name: 'groups',
          component: () => import('../views/dashboard/Utils/GroupsView.vue'),
        },
        {
          path: '/typedocs',
          name: 'typedocs',
          component: () => import('../views/dashboard/Utils/TypeDocumentsView.vue'),
        },
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
