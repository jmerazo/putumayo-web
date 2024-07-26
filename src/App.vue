<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import NavBar from '@/components/shared/Navbar.vue';
import Slider from "@/components/shared/Slider.vue";
import Footer from "@/components/shared/Footer.vue";
import { useUserStore } from './stores/users';

const route = useRoute();
const store = useUserStore();

// Crear refs para los tokens
const authRefresh = ref(localStorage.getItem('refresh_token'));
const authAccess = ref(localStorage.getItem('access_token'));

// Computed property para determinar si mostrar la barra de navegación
const showNavBar = computed(() => {
  return !(authAccess.value && authAccess.value !== '' && authRefresh.value && authRefresh.value !== ''); // Hide NavBar if authenticated
});

// Función para actualizar los tokens desde localStorage
const updateTokens = () => {
  authRefresh.value = localStorage.getItem('refresh_token');
  authAccess.value = localStorage.getItem('access_token');
};

// Verificar periódicamente los cambios en localStorage
let intervalId;

onMounted(() => {
  intervalId = setInterval(updateTokens, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="app-container">
    <NavBar v-if="showNavBar"/>
    <Slider v-if="showNavBar"/>
    <main class="main-content">
      <router-view />
    </main>
    <Footer v-if="showNavBar" class="footer"/>
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.footer {
  flex-shrink: 0;
}
</style>