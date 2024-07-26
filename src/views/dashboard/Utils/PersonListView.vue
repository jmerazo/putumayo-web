<script setup>
import { ref, onMounted } from 'vue';
import { usePersonStore } from '@/stores/person';
import { useModalStore } from "@/stores/modal";
import ModalPersonAdd from '@/components/modals/dashboard/ModalPersonAdd.vue';

const person = usePersonStore();
const modal = useModalStore();
const persons = ref([]);

onMounted(async () => {
  await person.getPersons();
  persons.value = person.personsList;
  console.log('persons: ', persons.value)
});
</script>

<template>
  <div class="users-list">
    <div class="title__users">
        <h3>People Putumayo</h3>
    </div>
    <div class="btn__panelUsers">
      <button @click.prevent="modal.handleClickModalPersonAdd()" type="button" class="btn__adduser">
        <img src="/icons/icon_user_add.svg" class="icon__panel">
      </button>
    </div>    
    <hr class="seccion__divisor">
    <div class="cards-container">
      <div v-for="p in persons" :key="p.id" class="card">
        <div class="icon__user">
          <img src="/icons/icon_user.svg">
        </div>
        <div class="card-header">
          <h2>{{ p.first_name }} {{ p.last_name }}</h2>
          <p class="txt__email summary"><img src="/icons/icon_email.svg" class="icon__details"> {{ p.email }}</p>
          <p class="txt__rol summary"><img src="/icons/icon_cellphone.svg" class="icon__details"> {{ p.cellphone }}</p>
        </div>
        <details>
          <summary class="summary"><img src="/icons/icon_list_view.svg" class="icon__details"> View more...</summary>
          <ul>
            <li class="txt__detaild__person"><strong>Document Type:</strong> {{ p.p_doc_type.name }}</li>
            <li class="txt__detaild__person"><strong>Document Number:</strong> {{ p.doc_number }}</li>
            <li class="txt__detaild__person"><strong>Address:</strong> {{ p.address }}</li>            
            <li class="txt__detaild__person"><strong>City:</strong> {{ p.p_city.name }}</li>
            <li class="txt__detaild__person"><strong>Department:</strong> {{ p.p_department.name }}</li>
            <li class="txt__detaild__person"><strong>Picture:</strong> {{ p.picture }}</li>
          </ul>
        </details>
        <div class="btn__settingsUser">
            <a href=""><img src="/icons/icon_edit.svg" class="icon__details"> </a>
            <a href=""><img src="/icons/icon_delete.svg" class="icon__details"> </a>            
        </div>
      </div>
    </div>
  </div>
  <ModalPersonAdd/>
</template>

<style scoped>
.users-list {
  width: 100%;
  padding: 1rem;
}

.btn__adduser {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  margin-left: auto;
}

.icon__user {
  display: flex;
  margin: auto;
  width: 4rem;
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

.txt__detaild__person {
  font-size: 0.8rem;
}

.seccion__divisor {
  border: none;
  border-top: 2px solid #ccc;
  margin: 20px 0;
}

.summary {
  display: flex;
  align-items: center;
}

.txt__data_gm {
  list-style: none;
  font-size: 0.8rem;
  padding: 0;
}

.txt__data_gm li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
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
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  max-width: 100%;
}

.txt__rol {
  font-size: 0.8rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  max-width: 100%;
}

.icon__details {
  width: 1rem;
  margin-right: 0.5rem;
}

.btn__settingsUser {
  display: flex;
  justify-content: flex-end;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  background-color: var(--govco-card-background, white);
  border: 1px solid var(--govco-card-border-color, #ddd);
  border-radius: 8px;
  box-shadow: var(--govco-card-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
  padding: 1rem;
  width: 100%;
  max-width: 300px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.card-header {
  margin-bottom: 1rem;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.card-header p {
  margin: 0.5rem 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

details {
  margin-top: 1rem;
}

summary {
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0.5rem 0;
}
</style>
