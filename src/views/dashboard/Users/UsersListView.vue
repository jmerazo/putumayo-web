<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/users';

const store = useUserStore();
const users = ref([]);

onMounted(async () => {
  await store.getUsers();
  users.value = store.usersList;
  console.log('users: ', users.value)
});
</script>

<template>
  <div class="users-list">
    <div class="title__users">
        <h3>Users List</h3>
    </div>    
    <div class="cards-container">
      <div v-for="user in users" :key="user.a_person.id" class="card">
        <div class="card-header">
          <h2>{{ user.a_person.first_name }} {{ user.a_person.last_name }}</h2>
          <p class="txt__email">{{ user.a_person.email }}</p>
          <p class="txt__rol">{{ user.a_rol.name }}</p>
        </div>
        <details>
          <summary class="summary"><img src="/icons/icon_user_group.svg" class="icon__details">Groups</summary>
          <ul>
            <li v-for="group in user.a_group" :key="group.id">{{ group.name }}</li>
          </ul>
        </details>
        <details>
          <summary class="summary"><img src="/icons/icon_module.svg" class="icon__details">Modules</summary>
          <ul>
            <li v-for="module in user.modules" :key="module.id">
              <strong>{{ module.name }}</strong>
              <ul>
                <li v-for="permission in module.permissions" :key="permission.id">{{ permission.name }}</li>
              </ul>
            </li>
          </ul>
        </details>
      </div>
    </div>
  </div>
</template>

<style scoped>
.users-list {
  width: 100%;
  padding: 1rem;
}

.summary {
    display: flex;
    align-items: center;
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