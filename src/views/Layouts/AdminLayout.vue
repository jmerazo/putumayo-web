<script setup>
import Sidebar from "@/components/dashboard/base/Sidebar.vue";
</script>

<template>
  <div class="admin-layout">
    <Sidebar class="sidebar"/>
    <div class="main-content">
      <router-view /> <!-- Aquí se renderizarán las rutas hijas -->
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh; /* Para ocupar toda la altura de la pantalla */
}

.sidebar {
  flex-shrink: 0;
}

.main-content {
  flex-grow: 1;
  padding: 1rem;
  overflow-x: auto;
}
</style>