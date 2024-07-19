<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router';
import NavBar from '@/components/shared/Navbar.vue';
import Slider from "@/components/shared/Slider.vue";
import Footer from "@/components/shared/Footer.vue"
import { useUserStore } from './stores/users';

const route = useRoute();
const store = useUserStore();

// Recuperar los tokens del localStorage
const auth_refresh = localStorage.getItem('refresh_token');
const auth_access = localStorage.getItem('access_token');

// Computed property para determinar si mostrar la barra de navegación
const showNavBar = computed(() => {
  return !(auth_access && auth_access !== '' && auth_refresh && auth_refresh !== ''); // Hide NavBar if authenticated
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
