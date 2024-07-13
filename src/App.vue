<script setup>
import { RouterView} from "vue-router";
import NavBar from "./components/Navbar.vue";
</script>

<template>
  <NavBar/>
  <main>
    <router-view/>
  </main> 
</template>

<style >
</style>
