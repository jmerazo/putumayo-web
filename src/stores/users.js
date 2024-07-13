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
    const accessToken = ref(null);
    const refreshToken = ref(null);

    /* onMounted(async () =>{
    }) */

    const loadUserPermissions = async () => {
        isLoadingPermissions.value = true;  // Comienza la carga
        try {
          const response = await APIService.getUserData(); // Asume que este método realiza la llamada API al endpoint
          if (response.status === 200) {
            userPermissions.value = response.data;
            console.log('user modules: ', response.data)
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
            userData.value = response.data.user_data;
            accessToken.value = response.data.access_token;
            refreshToken.value = response.data.refresh_token;
            authActive.value = true;
            errorAuth.value = null;
            localStorage.setItem('user_data', JSON.stringify(response.data.user_data));
            localStorage.setItem('user_data', JSON.stringify(response.data.user_data));
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            await loadUserPermissions(); 
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
    
    function isAuth() {
        const auth = accessToken.value;
        if (auth) {
            authActive.value = true;
        } else {
            authActive.value = false;
        }
    }

    return {
        login,
        logout,
        isAuth,
        userData,
        errorAuth,
        authActive,
        socialData,
        useUserStore,
        userPermissions,
        isLoadingPermissions
    };
});