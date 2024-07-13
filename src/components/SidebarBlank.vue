<script setup>
import { ref, onMounted } from 'vue';

const expandBtn = ref(null);
const allLinks = ref([]);

onMounted(() => {
    const expand_btn = expandBtn.value;
    const all_links = document.querySelectorAll(".sidebar-links a");

    if (expand_btn) {
        expand_btn.addEventListener("click", () => {
            document.body.classList.toggle("collapsed");
        });
    }

    all_links.forEach((elem) => {
        elem.addEventListener('click', function() {
            const hrefLinkClick = elem.href;

            all_links.forEach((link) => {
                if (link.href === hrefLinkClick) {
                    link.classList.add("active");
                } else {
                    link.classList.remove('active');
                }
            });
        });
    });

    allLinks.value = all_links;
});
</script>

<template>
    <nav>
        <div class="sidebar-top">
            <a href="#" class="logo__wrapper">
                <img 
                    src="../../public/vite.svg" alt="logo" 
                    class="logo"
                >
                <img 
                    src="../../public/vite.svg" alt=""
                    class="logo-small"
                >
            </a>
        </div>
        <div class="sidebar-links">
            <ul>
                <li>
                    <a href="#home" title="Home" class="tooltip">
                        <img 
                            src="../../public/icons/icon_home.png" 
                            alt="Left Collapse"
                        >
                        <span class="link hide">Home</span>
                        <span class="tooltip__content">Home</span>
                    </a>
                </li>
                <li>
                    <a href="#usuarios" title="Usuarios" class="tooltip">
                        <img 
                            src="../../public/icons/icon_users.png" 
                            alt="Left Collapse"
                        >
                        <span class="link hide">Users</span>
                        <span class="tooltip__content">Users</span>
                    </a>
                </li>
            </ul>
        </div>
        <!--div class="sidebar-bottom hide">
            <img src="../assets/vue.svg" alt="Vue">
            <p>Welcome to Dizzu</p>
            <button>Explore</button>
        </div-->
        <div class="expand-btn" ref="expandBtn">
            <img 
                src="../../public/icons/icon_arrow_left_double.png" 
                alt="Left Collapse"
            >
            <span class="hide">Collapse</span>
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
    border-radius: 1rem;
    background: var(--primary-color);
    width: 18rem;
    margin-top: 3.5rem;
    padding: 1rem 0.625rem;
    display: flex;
    color: white;
    flex-direction: column;
    transition: all 0.3s ease-in-out;
}

/* main {
    flex: 1;
    display: flex;
    flex-direction: column;
} */

body.collapsed nav {
    width: 4.75rem;
}

body.collapsed .hide {
    display: none;
}

.hide {
    color: #000000;
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
    padding: 0.5rem 0;
    border-top: 1px solid var(--sidebar-gray-background);
}

.sidebar-links ul {
    list-style-type: none;
    position: relative;
}

.sidebar-links li {
    color: var(--primary-color);
}

body.collapsed .sidebar-links li {
    display: flex;
    justify-content: center;
    align-items: center;
}

.sidebar-links li svg {
    stroke: var(--primary-color);
    transition: none;
    width: 1.75rem;
    height: 1.75rem;
}

.sidebar-links li a {
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
}

.sidebar-links li a img {
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

.sidebar-bottom {
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    position: relative;
    flex-direction: column;
    margin-top: auto;
    border: 1px solid #F0F0F0;
    text-align: center;
    border-radius: 1rem;
    padding-top: 4rem;
    margin-bottom: 3rem;
}

.sidebar-bottom img {
    max-width: 10.25rem;
    margin: 0 auto;
    width: 100%;
    margin-top: -5.25rem;
}

.sidebar-bottom p {
    margin-top: -2rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
}

.tooltip {
    position: relative;
}

.tooltip .tooltip__content {
    visibility: hidden;
    background: var(--primary-color);
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
}

.expand-btn img {
    width: 1.5rem; /* Ajusta el tamaño del icono */
    height: auto;
}

body.collapsed .expand-btn {
    transform: rotate(180deg); /* Girar 180 grados cuando el sidebar está colapsado */
}
</style>
