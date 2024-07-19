<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/users";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();

</script>

<template>
    <div>Home</div>
</template>
  
<style scoped>

</style>  