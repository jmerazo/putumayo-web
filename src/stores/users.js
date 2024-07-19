import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import APIService from '../services/APIService';

export const useUserStore = defineStore('userStore', () => {
    const userData = ref(null);
    const errorAuth = ref(null);
    const authActive = ref(false);
    const socialData = ref(false);
    const userPermissions = ref(null); 
    const isLoadingPermissions = ref(false);
    const accessToken = ref(localStorage.getItem('access_token'));
    const refreshToken = ref(localStorage.getItem('refresh_token'));
    const usersList = ref([]);

    const router = useRouter();

    const isRehydrated = ref(false);

    /* onMounted(async () => {
      isAuth();
      await rehydrateAuth();
    }); */

    const rehydrateAuth = async () => {
      if (refreshToken.value) {
        try {
          const response = await APIService.refreshAuthToken({ refresh: refreshToken.value });
          if (response.status === 200 && response.data.access) {
            accessToken.value = response.data.access;
            userData.value = response.data.authId;
            authActive.value = true;
            localStorage.setItem('access_token', response.data.access);
            isRehydrated.value = true;
            await loadUserPermissions(response.data.authId); 
          } else {
            throw new Error('Failed to refresh token');
          }
        } catch (error) {
          console.error('Error al rehidratar la autenticación:', error);
          logout();  // Si hay un error, asegúrate de limpiar el estado
        }
      } 
    };

    const loadUserPermissions = async (id) => {
        isLoadingPermissions.value = true;  // Comienza la carga
        try {
          const response = await APIService.getUserData(id); // Asume que este método realiza la llamada API al endpoint
          if (response.status === 200) {
            userPermissions.value = response.data;
            console.log('user modules: ', userPermissions.value )
            localStorage.setItem('user_permissions', JSON.stringify(response.data));
          } else {
            console.error('Error al cargar los permisos del usuario:', response.statusText);
          }
        } catch (error) {
          console.error('Error al realizar la solicitud de permisos:', error);
        } finally {
          isLoadingPermissions.value = false;  // Finaliza la carga
        }
    };

    const login = async (credentials, authType) => {
        try {
          const response = await APIService.getLogin(credentials, authType);
          if (response.status === 200) {
            userData.value = response.data.authId;
            accessToken.value = response.data.access;
            refreshToken.value = response.data.refresh;
            console.log('response data user: ', response.data)
            authActive.value = true;
            errorAuth.value = null;
            localStorage.setItem('user_data', JSON.stringify(response.data.authId));
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            await loadUserPermissions(response.data.authId); 
            return { success: true };
          } else {
            errorAuth.value = 'Credenciales incorrectas';
            return { success: false };
          }
        } catch (error) {
          console.error('Error en el inicio de sesión:', error);
          errorAuth.value = error;
          return { success: false, error };
        }
    };

    const getUsers = async () => {
      try {
        const response = await APIService.getUsers();
        if (response.status === 200) {
          usersList.value = response.data;
        } else {
          return { success: false };
        }
      } catch (error) {
        console.error('Error users list: ', error);
        return { success: false, error };
      }
    }

    const logout = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('user_permissions');
      accessToken.value = null;
      refreshToken.value = null;
      userData.value = null;
      userPermissions.value = null;
      authActive.value = false;
      router.push('/');
    };
      
    const isAuth = () => {
      const auth = localStorage.getItem('access_token');
      if (auth) {
          authActive.value = true;
      } else {
          authActive.value = false;
      }
    };

    return {
      login,
      logout,
      isAuth,
      rehydrateAuth,
      userData,
      errorAuth,
      authActive,
      socialData,
      userPermissions,
      isLoadingPermissions,
      accessToken,
      refreshToken,
      getUsers,
      usersList
    };
});