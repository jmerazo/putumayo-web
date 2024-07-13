<script setup>
import { ref, computed } from "vue";
import { RouterLink, useRoute } from 'vue-router';
import { useUserStore } from "../stores/users";

const users = useUserStore();
console.log('data user: ', users)

</script>

<template>
    <div id="userData" data-user='<%- JSON.stringify(userData) %>'></div>
    <div class="sidebar">
        <a href="/dashboard" class="title__Sidebar"><h2>DIZU</h2></a>
        <hr>
            <i class="fa-regular fa-circle-user icon__user"></i>
            <a id="userLogin" href="/profile" class="user__login"></a>
        <ul>
            <li><button id="logoutButton">Cerrar sesión</button></li>
        </ul>
        <button type="button" class="btn btn-light">Cerrar sesión</button>
    </div>
</template>

<style scoped>
html, body {
    margin: 0;
    padding: 0;
    height: 100%; /* Asegúrate de que html y body ocupen todo el alto disponible */
}

body {
    display: flex;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    overflow: hidden; /* Previene desbordamiento de contenido que puede causar scroll */
    font-family: 'Montserrat', sans-serif;
}

.sidebar {
    width: 250px;
    background-color: #a52312;
    color: #fff;
    padding: 20px;
    height: 100vh; /* Opcional, dependiendo de tus necesidades de diseño */
}

.sidebar h2 {
    padding-top: 0;
    color: #fff;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar ul li a, .sidebar ul li button {
    color: #fff;
    text-decoration: none;
    display: block;
    padding: 10px;
    border: none;
    background: none;
    text-align: left;
    width: 100%;
    cursor: pointer;
}

.sidebar ul li button:hover, .sidebar ul li a:hover {
    background-color: #555;
}

.main-content {
    flex-grow: 1;
    padding: 20px;
    background-color: #f8f9fa;
}

@media (max-width: 768px) {
    .sidebar {
        width: 100%;
        height: auto;
    }
    .main-content {
        padding: 10px;
    }
}

.title__Sidebar {
    text-decoration: none;
}

.user__login{
    text-decoration: none;
    color: white;
}

.icon__user{
    margin-right: 0.5rem;
}
</style>