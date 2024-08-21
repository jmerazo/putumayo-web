<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { getFullImageUrl } from "@/helpers/";
import { useUserStore } from '@/stores/users';

const store = useUserStore();
const expandBtn = ref(null);

// Recupera los datos de permisos de usuario desde localStorage
const modules = JSON.parse(localStorage.getItem('user_permissions')) || [];

// Computed property para los permisos de usuario
const userPermissions = computed(() => modules);
/* console.log('userPermissions:', JSON.stringify(userPermissions.value, null, 2)); */

// Estado para rastrear la expansión de cada módulo
const expandedModules = ref(modules.map(() => false));
const isCollapsed = ref(false);

const toggleModule = (index) => {
  expandedModules.value[index] = !expandedModules.value[index];
};

onMounted(() => {
    const expand_btn = expandBtn.value;

    if (expand_btn) {
        expand_btn.addEventListener("click", () => {
            document.body.classList.toggle("collapsed");
            isCollapsed.value = document.body.classList.contains("collapsed");
            // Contrae todos los módulos cuando se minimiza la barra lateral
            if (isCollapsed.value) {
                expandedModules.value = modules.map(() => false);
            }
        });
    }

    watch(() => document.body.classList.contains("collapsed"), (newVal) => {
      isCollapsed.value = newVal;
      if (newVal) {
        expandedModules.value = modules.map(() => false);
      }
    });
});

</script>

<template>
    <nav>
        <div class="sidebar-top">
            <a href="#" class="logo__wrapper">
                <img 
                    src="/img/logos/logo_goberptyo.png" alt="logo" 
                    class="logo"
                >
                <img 
                    src="/img/logos/logo_goberptyo.png" alt=""
                    class="logo-small"
                >
            </a>
            <div class="expand-btn" ref="expandBtn">
                <img 
                    src="/icons/icon_menu.svg" 
                    alt="Menu"
                >
            </div>
        </div>
        <div class="sidebar-links">
            <ul>
                <li v-for="(module, index) in userPermissions" :key="module.module.id">
                <div @click="toggleModule(index)" class="module-header tooltip">
                    <img 
                    :src="getFullImageUrl(module.module.icon) || '/icons/icon_default.svg'" 
                    alt="Icon"
                    class="module-icon icons__sidebar"
                    >
                    <span class="link hide text__sidebar">{{ module.module.name }}</span>
                    <span class="tooltip__content text__sidebar">{{ module.module.name }}</span>
                    <img 
                    v-if="module.submodules && module.submodules.length > 0" 
                    :class="{'rotate-90': expandedModules[index], 'hidden-arrow': isCollapsed}" 
                    src="/icons/icon_arrow_down.svg" 
                    alt="Expand"
                    class="expand-icon"
                    >
                </div>
                <ul v-show="expandedModules[index] && !isCollapsed">
                    <li v-for="submodule in module.submodules" :key="submodule.id">
                    <a :href="submodule.route" :title="submodule.name" class="tooltip">
                        <img 
                        class="icons__sidebar__sm"
                        :src="getFullImageUrl(submodule.icon) || '/icons/icon_default.svg'" 
                        alt="Icon"
                        >
                        <span class="link hide text__sidebar__sm">{{ submodule.name }}</span>
                        <span class="tooltip__content text__sidebar__sm">{{ submodule.name }}</span>
                    </a>
                    </li>
                </ul>
                </li>
            </ul>
        </div>

        <div class="btn__exit">
            <a href="#" title="Exit" class="tooltip" @click="store.logout()">
                <img 
                    src="/icons/icon_logout.svg" 
                    alt="Exit"
                    class="icons__sidebar"
                >
                <span class="link hide text__sidebar">Logout</span>
                <span class="tooltip__content text__sidebar">Logout</span>
            </a>
        </div>        
    </nav>
</template>

<style scoped>
nav {
    position: sticky;
    top: 0;
    left: 0;
    min-height: 100vh;
    height: 100%;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background: var(--accent-color);
    width: 18rem;
    padding: 1rem 0.625rem;
    display: flex;
    color: white;
    flex-direction: column;
    transition: all 0.3s ease-in-out;
}

body.collapsed nav {
    width: 4.75rem;
}

body.collapsed .hide {
    display: none;
}

.text__sidebar {
    font-size: 16px;
}

.text__sidebar__sm {
    font-size: 14px;
}

.icons__sidebar {
    width: 1.5rem;
    height: auto;
}

.icon__sidebar__sm {
    width: 1.2rem; /* Ajusta según sea necesario */
    height: auto;
}

/* Add this to ensure the main content shifts when the sidebar collapses */
.dashboard-container.collapsed .dashboard-content {
    margin-left: 4.75rem;
}

.dashboard-container:not(.collapsed) .dashboard-content {
    margin-left: 18rem;
}

.hide {
    color: #000000;
}

.icons__sidebar {
    width: 1.5rem;
    height: auto;
}

.module-icon {
    width: 1.5rem;
    height: auto;
    margin-right: 0.5rem;
}

.icons__sidebar__sm {
    width: 1.25rem;
    height: auto;
    margin-right: 0.5rem;
}

.sidebar-top {
    position: relative;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    height: 4rem;
    padding-bottom: 1rem;
}

body.collapsed .sidebar-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.logo__wrapper {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1.25rem;
    padding: 0.5rem;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
}

.logo {
    height: 2.6125rem;
    overflow: hidden;
    max-width: 100%;
    object-fit: contain;
}

.logo-small {
    display: none;
}

body.collapsed .logo {
    display: none;
}

body.collapsed .logo-small {
    display: block;
}

.sidebar-links {
    flex: 1; /* Toma todo el espacio disponible */
    padding: 0.5rem 0;
    border-top: 1px solid var(--sidebar-gray-background);
    display: flex;
    flex-direction: column;
}

.sidebar-links ul {
    list-style-type: none;
    position: relative;
    flex: 1;
}

.sidebar-links li {
    color: var(--primary-color);
}

body.collapsed .sidebar-links li {
    display: flex;
    justify-content: center;
    align-items: center;
}

.sidebar-links li a,
.module-header {
    padding: 0.75rem 0.75rem;
    margin: 0.5rem 0;
    color: var(--text);
    font-size: 1.25rem;
    display: flex;
    justify-content: start;
    align-items: center;
    height: 3.5rem;
    border-radius: 0.625rem;
    text-decoration: none;
    transition: background 0.3s ease-in-out;
    cursor: pointer; /* Añade cursor pointer para módulo-header */
}

.sidebar-links li a img,
.module-header img {
    height: 2.125rem;
    width: 2.125rem;
}

.sidebar-links .link {
    margin-left: 1.875rem;
}

.sidebar-links .active:hover {
    background: var(--primary-color);
    color: var(--background);
}

.sidebar-links .active:hover svg {
    stroke: var(--background);
}

.sidebar-links ul ul {
    padding-left: 1rem;
    list-style-type: none;
}

.sidebar-links ul ul li {
    padding: 0.05rem 0;
}

.tooltip {
    position: relative;
}

.tooltip .tooltip__content {
    visibility: hidden;
    background: var(--accent-color);
    color: #000000;
    text-align: center;
    border-radius: 0.375rem;
    padding: 0.375rem 0.75rem;
    position: absolute;
    z-index: 1;
    left: 4.6875rem;
}

body.collapsed .tooltip:hover .tooltip__content {
    visibility: visible;
}

.expand-btn {
    display: flex;
    width: 100%;  /* Ajusta el ancho al 100% del contenedor */
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease-in-out;
    cursor: pointer; /* Asegura que el botón sea clicable */
    margin-bottom: 1rem;
}

.expand-btn img {
    width: 1.5rem; /* Ajusta el tamaño del icono */
    height: auto;
}

body.collapsed .expand-btn {
    transform: rotate(180deg); /* Girar 180 grados cuando el sidebar está colapsado */
}

.btn__exit a {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* Espacio entre el icono y el texto */
}

.btn__exit {
    justify-content: center;
    margin-top: auto; /* Empuja el botón de logout al final */
    display: flex;
    align-items: center; /* Asegura que los iconos y el texto estén en la misma línea */
}

.expand-icon {
    margin-left: auto;
    height: 1rem; /* Ajusta el tamaño del icono de expansión */
    width: auto;
}

.rotate-90 {
    transform: rotate(180deg);
}

.hidden-arrow {
    display: none;
}
</style>