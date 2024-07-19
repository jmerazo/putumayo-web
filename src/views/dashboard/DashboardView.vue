<script setup>
import Sidebar from "@/components/dashboard/base/Sidebar.vue";
</script>

<template>
    <div class="dashboard-container">
      <h5>Dashboard</h5>
    </div>
  </template>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    flex-grow: 1;
  }
  
  .sidebar {
    flex-shrink: 0;
  }
  
  .dashboard-content {
    flex-grow: 1;
    padding: 1rem;
  }
  </style>