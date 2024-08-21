<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/users';
import { useModalStore } from "@/stores/modal";
import ModalUsersAdd from '@/components/modals/dashboard/ModalUsersAdd.vue';
import ModalUsersUpdate from '@/components/modals/dashboard/ModalUsersUpdate.vue';
import ModalUsersPassword from '@/components/modals/dashboard/ModalUsersPassword.vue';

const store = useUserStore();
const modal = useModalStore();
const users = ref([]);

onMounted(async () => {
  await store.getUsers();
  users.value = store.usersList;
  console.log('users: ', users.value)
});

function deleteUser(id, uf, ul) {
  const confirmDelete = window.confirm(
    `¿Are you sure you want to delete the user ${uf + " " + ul}?`
  );
  if (!confirmDelete) {
    return;
  }
  store.deleteUser(id).then(response => {
    console.log(response.msg);
  }).catch(error => {
    console.error('Error deleting user:', error);
  });
}
</script>

<template>
  <div class="users-list">
    <div class="title__users">
        <h3>Users Putumayo</h3>
    </div>
    <div class="btn__panelUsers">
      <button @click.prevent="modal.handleClickModalUserAdd()" type="button" class="btn__adduser">
        <img src="/icons/icon_user_add.svg" class="icon__panel">
      </button>
    </div>    
    <hr class="seccion__divisor">
    <div class="cards-container">
      <div v-for="user in users" :key="user.a_person.id" class="card">
        <div class="card-header">
          <h2>{{ user.a_person.first_name }} {{ user.a_person.last_name }}</h2>
          <p class="txt__email">{{ user.a_person.email }}</p>
          <p class="txt__rol">{{ user.a_rol.name }}</p>
        </div>
        <details>
          <summary class="summary"><img src="/icons/icon_user_group.svg" class="icon__details">Groups</summary>
          <ul class="txt__data_gm">
            <li class="txt__data_gm" v-for="group in user.a_group" :key="group.id"><img src="/icons/icon_corner-down-right-fill.svg" class="icon__details">{{ group.name }}</li>
          </ul>
        </details>
        <details>
          <summary class="summary"><img src="/icons/icon_module.svg" class="icon__details">Modules</summary>
          <ul>
            <li v-for="module in user.modules" :key="module.id">
              <strong class="txt__data_gm">{{ module.name }}</strong>
              <ul class="txt__data_gm">
                <li v-for="permission in module.permissions" :key="permission.id "><img src="/icons/icon_corner-down-right-fill.svg" class="icon__details"> {{ permission.name }}</li>
              </ul>
            </li>
          </ul>
        </details>
        <div class="btn__settingsUser">
            <a href="" @click.prevent="store.selectedUserPassword(user.id)">
              <img src="/icons/icon_password_lock.svg" class="icon__details"> 
            </a>
            <a href="" @click.prevent="store.selectedUser(user.id)">
              <img src="/icons/icon_edit.svg" class="icon__details"> 
            </a>
            <a href="#" @click.prevent="deleteUser(user.id, user.a_person.first_name, user.a_person.last_name)">
                <img src="/icons/icon_delete.svg" class="icon__details">
            </a>            
        </div>
      </div>
    </div>
  </div>
  <ModalUsersAdd/>
  <ModalUsersUpdate/>
  <ModalUsersPassword/>
</template>

<style scoped>
.users-list {
  width: 100%;
  padding: 1rem;
}

.btn__adduser {
  background-color: transparent; /* Fondo transparente */
  border: none; /* Sin borde */
  padding: 0; /* Sin relleno */
  cursor: pointer; /* Cursor de mano */
  margin-left: auto; /* Empuja el botón al extremo derecho */
}

.btn__panelUsers {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1.5rem;
}

.icon__panel{
    width: 1.3rem;
    height: auto;
}

.seccion__divisor {
  border: none;
  border-top: 2px solid #ccc;
  margin: 20px 0; /* Ajusta el margen según sea necesario */
}

.summary {
    display: flex;
    align-items: center;
}

.txt__data_gm{
    list-style: none;
    font-size: 0.8rem;
    padding: 0;
}

.txt__data_gm li {
  display: flex;
  align-items: center;
  margin-bottom: 5px; /* Ajusta el espacio entre las líneas según sea necesario */
}

.title__users {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
}

.txt__email {
    font-size: 1rem;
    font-weight: 350;
}

.txt__rol {
    font-size: 0.8rem;
}

.icon__details {
    width: 1rem;
    margin-right: 0.5rem;
}

.btn__settingsUser {
    display: flex;
    justify-content: flex-end; /* Alinea los íconos a la derecha */
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 100%;
  max-width: 300px;
}

.card-header {
  margin-bottom: 1rem;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.card-header p {
  margin: 0.5rem 0;
}

details {
  margin-top: 1rem;
}

summary {
  cursor: pointer;
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0.5rem 0;
}
</style>