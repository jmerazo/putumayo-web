<script setup>
import { useModalStore } from "@/stores/modal";
import { useUtilsStore } from "@/stores/utils";
import ModalTypeDocumentsAdd from '@/components/modals/dashboard/ModalTypeDocumentsAdd.vue';
import ModalTypeDocumentsUpdate from '@/components/modals/dashboard/ModalTypeDocumentsUpdate.vue';

const modal = useModalStore();
const utilsStore = useUtilsStore();

function deleteTypedoc(id, mod) {
  const confirmDelete = window.confirm(
    `¿Are you sure you want to delete the type document ${mod}?`
  );
  if (!confirmDelete) {
    return;
  }
  utilsStore.deleteTypeDocument(id).then(response => {
    console.log(response.msg);
  }).catch(error => {
    console.error('Error deleting type document:', error);
  });
}
</script>

<template>
  <div class="users-list">
    <div class="title__users">
        <h3>Type Documents Putumayo</h3>
    </div>
    <div class="btn__panelUsers">
      <button @click.prevent="modal.handleClickModalTypedocsAdd()" type="button" class="btn__adduser">
        <img src="/icons/icon_add.svg" class="icon__panel">
      </button>
    </div>    
    <hr class="seccion__divisor">
    <div class="cards-container">
      <div v-for="t in utilsStore.typedocs" :key="t.id" :value="t.id" class="card">
        <div class="icon__dependencies">
          <img src="/icons/icon_typedocs.svg">
        </div>
        <div class="card-header">
          <h2>{{ t.name }}</h2>
          <span>{{ t.acronym }}</span>
        </div>
        <div class="btn__settingsUser">
            <a href="" @click.prevent="utilsStore.selectedTypedoc(t.id)">
              <img src="/icons/icon_edit.svg" class="icon__details"> 
            </a>
            <a href="#" @click.prevent="deleteTypedoc(t.id, t.name)">
                <img src="/icons/icon_delete.svg" class="icon__details">
            </a>              
        </div>
      </div>
    </div>
  </div>
  <ModalTypeDocumentsAdd/>
  <ModalTypeDocumentsUpdate/>
</template>

<style scoped>
.users-list {
  width: 100%;
  padding: 1rem;
}

.icon__dependencies {
  display: flex;
  margin: auto;
  width: 4rem;
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