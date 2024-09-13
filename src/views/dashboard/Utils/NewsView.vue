<script setup>
import { ref, onMounted } from 'vue';
import { useModalStore } from "@/stores/modal";
import { useUtilsStore } from '@/stores/utils';
import { getFullNewsImageUrl } from '@/helpers/'
import ModalNewsAdd from '@/components/modals/dashboard/ModalNewsAdd.vue';
import ModalNewsUpdate from '@/components/modals/dashboard/ModalNewsUpdate.vue';

const modal = useModalStore();
const utilsStore = useUtilsStore();
const news = ref([])

function deleteNew(id, r) {
  const confirmDelete = window.confirm(
    `¿Are you sure you want to delete the new ${r}?`
  );
  if (!confirmDelete) {
    return;
  }
  utilsStore.deleteNew(id).then(response => {
    console.log(response.msg);
  }).catch(error => {
    console.error('Error deleting new:', error);
  });
}

onMounted(async () => {
    news.value = await utilsStore.loadNews()
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};
</script>

<template>
  <div class="users-list">
    <div class="title__users">
        <h3>News Putumayo</h3>
    </div>
    <div class="btn__panelUsers">
      <button @click.prevent="modal.handleClickModalNewsAdd()" type="button" class="btn__adduser">
        <img src="/icons/icon_add.svg" class="icon__panel">
      </button>
    </div>    
    <hr class="seccion__divisor">
    <v-row>
      <v-col
        v-for="(item, index) in news"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto news-card" max-width="344" outlined>
          <!-- Imagen con efecto de zoom -->
          <v-img
            :src="getFullNewsImageUrl(item.featured_image)"
            height="200px"
            class="news-image"
          ></v-img>
          <!-- Título con tooltip -->
          <v-card-title class="news-card-title" :title="item.title">{{ item.title }}</v-card-title>
          <!-- Fecha de la noticia -->
          <v-card-subtitle class="news-date">{{ formatDate(item.publication_date) }}</v-card-subtitle>
          <div class="btn__settingsUser">
            <a href="" @click.prevent="utilsStore.selectedNewUpdate(item.id)">
              <img src="/icons/icon_edit.svg" class="icon__details"> 
            </a>
            <a href="#" @click.prevent="deleteNew(item.id, item.title)">
                <img src="/icons/icon_delete.svg" class="icon__details">
            </a>            
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <ModalNewsAdd/>
  <ModalNewsUpdate/>
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
    margin-bottom: 1rem;
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

/* Sección de noticias */
.news-section {
  margin-top: 2rem;
}

/* Título de la sección de noticias */
.news-title {
  font-family: var(--fuente-principal);
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

/* Sección de noticias */
.news-section {
  margin-top: 2rem;
}

/* Tarjeta de noticia */
.news-card {
  transition: transform 0.3s ease;
}

/* Efecto de zoom en la imagen */
.news-image {
  transition: transform 0.3s ease;
}

.news-image:hover {
  transform: scale(1.05);
}

/* Título con tooltip y estilo */
.news-card-title {
  font-family: var(--fuente-secundaria);
  font-size: 1.2rem;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

/* Fecha de la noticia */
.news-date {
  font-family: var(--fuente-secundaria);
  font-size: 0.9rem;
  color: var(--text-color);
  margin-top: -10px;
}

/* Zoom suave al pasar el cursor por la tarjeta */
.news-card:hover {
  transform: scale(1.02);
}
</style>