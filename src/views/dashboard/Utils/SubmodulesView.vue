<script setup>
import { useModalStore } from "@/stores/modal";
import { useUtilsStore } from '@/stores/utils';
import { getFullImageUrl } from "@/helpers/";
import ModalSubmoduleAdd from '@/components/modals/dashboard/ModalSubmoduleAdd.vue';
import ModalSubmoduleUpdate from '@/components/modals/dashboard/ModalSubmoduleUpdate.vue';

const modal = useModalStore();
const utilsStore = useUtilsStore();
function deleteSubmodule(id, mod) {
  const confirmDelete = window.confirm(
    `¿Are you sure you want to delete the submodule ${mod}?`
  );
  if (!confirmDelete) {
    return;
  }
  utilsStore.deleteSubmodule(id).then(response => {
    console.log(response.msg);
  }).catch(error => {
    console.error('Error deleting submodule:', error);
  });
}
</script>

<template>
  <div class="users-list">
    <div class="title__users">
        <h3>Submodules Putumayo</h3>
    </div>
    <div class="btn__panelUsers">
      <button @click.prevent="modal.handleClickModalSubmoduleAdd()" type="button" class="btn__adduser">
        <img src="/icons/icon_add.svg" class="icon__panel">
      </button>
    </div>    
    <hr class="seccion__divisor">
    <div class="cards-container">
      <div v-for="s in utilsStore.submodules" :key="s.id" :value="s.id" class="card">
        <div class="icon__subdependencies">
          <img :src="getFullImageUrl(s.icon)">
        </div>
        <div class="card-header">
          <h2>{{ s.name }}</h2>
          <span class="icons__vsub"><img class="icon__submodules" src="/icons/icon_setting.svg"> {{ s.sm_module.name }}</span>
          <span class="icons__vsub"><img class="icon__submodules" src="/icons/icon_route.svg"> {{ s.route }}</span>
        </div>
        <div class="btn__settingsUser">
            <a href="" @click.prevent="utilsStore.selectedSubmodule(s.id)">
              <img src="/icons/icon_edit.svg" class="icon__details"> 
            </a>
            <a href="#" @click.prevent="deleteSubmodule(s.id, s.name)">
                <img src="/icons/icon_delete.svg" class="icon__details">
            </a>              
        </div>
      </div>
    </div>
  </div>
  <ModalSubmoduleAdd/>
  <ModalSubmoduleUpdate/>
</template>

<style scoped>
.users-list {
  width: 100%;
  padding: 1rem;
}

.icon__subdependencies {
  display: flex;
  margin: auto;
  width: 4rem;
}

.icon__submodules {
  width: 1rem;
}

.icons__vsub {
  display: flex;
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