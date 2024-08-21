import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import APIService from '../services/APIService';
import { useModalStore } from "@/stores/modal";

export const useUserStore = defineStore('userStore', () => {
    const modal = useModalStore();
    const userData = ref(null);
    const errorAuth = ref(null);
    const authActive = ref(false);
    const socialData = ref(false);
    const userPermissions = ref(null); 
    const isLoadingPermissions = ref(false);
    const accessToken = ref(localStorage.getItem('access_token'));
    const refreshToken = ref(localStorage.getItem('refresh_token'));
    const usersList = ref([]);
    const userSelected = ref('');
    const usersOriginalList = ref([]);
    const userSelectedPassword = ref('');

    const router = useRouter();

    const isRehydrated = ref(false);

    onMounted(async () => {
      isAuth();
      /* await rehydrateAuth(); */
    });

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
          console.log('response permission: ', response)
          if (response.status === 200) {
            userPermissions.value = response.data;
            console.log('user modules: ', userPermissions.value )
            localStorage.setItem('user_permissions', JSON.stringify(response.data));
          } else {
            console.log('estoy aqui en error')
            console.error('Error al cargar los permisos del usuario:', response.statusText);
          }
        } catch (error) {
          console.error('Error al realizar la solicitud de permisos:', error);
        } finally {
          console.log('estoy aqui en false')
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
            const rp = await loadUserPermissions(response.data.authId); 
            console.log('rp: ', rp)
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
          usersOriginalList.value = response.data;
        } else {
          return { success: false };
        }
      } catch (error) {
        console.error('Error users list: ', error);
        return { success: false, error };
      }
    }

    const createUser = async(data) => {
      try {
        const response = await APIService.createUser(data)
        if(response.status === 201){
          router
          .push({
            name: "users", // Nombre de la ruta de la vista del panel
          })
          .catch((err) => {});
          return response;
        }else{
          console.log('status: ', response.status)
          throw new Error(`Error creating user: ${response.statusText}`);
        }
      } catch (error) {
        console.log('error create user: ', error)
        throw error;
      }
    }

    function selectedUser(id) {
      userSelected.value =  usersList.value.filter(user => user.id === id)
      modal.handleClickModalUserUpdate(userSelected.value); 
    }
  
    const userUpdate = async (id, data) => {
      const userIndex = usersList.value.findIndex((u) => u.id === id);
      if (userIndex !== -1) {
          Object.assign(usersList.value[userIndex], data);
          const response = await APIService.updateUser(id, data);
          return response; // Devuelve la respuesta completa
      } else {
          console.error(`User con ID ${id} no encontrada.`);
      }
    };

    function selectedUserPassword(id) {
      userSelectedPassword.value = id;
      console.log('userSelectedPassword: ', userSelectedPassword.value)
      modal.handleClickModalUserPassword(); 
    }

    const passwordUserUpdate = async (newPassword) => {
      const response = await APIService.updatePasswordUser(userSelectedPassword.value, newPassword);
      return response; // Devuelve la respuesta completa
    };

    async function deleteUser(pk) {
      console.log('pk: ', pk)
      const indexToDelete = usersList.value.findIndex(item => item.id === pk);
    
      if (indexToDelete === -1) {
        return { msg: "User not found" };
      }

      try {
        const response = await APIService.deleteUser(pk); // Realiza la solicitud DELETE al backend
        console.log('deleteUser response:', response);
        usersList.value.splice(indexToDelete, 1); // Elimina al usuario de la lista local
        console.log('User deleted successfully');
        return { msg: "User deleted successfully" };
      } catch (error) {
        console.error('Error deleting user:', error.response || error.message || error);
        return { msg: "Error deleting user", details: error.response || error.message || error };
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
      router
      .push({
        name: "home", // Nombre de la ruta de la vista del panel
      })
      .catch((err) => {});
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
      usersList,
      createUser,
      deleteUser,
      userSelected,
      selectedUser,
      userUpdate,
      selectedUserPassword,
      passwordUserUpdate
    };
});