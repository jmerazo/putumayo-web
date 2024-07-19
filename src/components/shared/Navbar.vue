<script setup>
import { ref, computed } from "vue";
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
/* const paginaInicio = computed(() => route.name === "home"); */

//mostrar barra lateral
const navMovil = ref(false);
const mostrarNavMovil = () => {
  navMovil.value = !navMovil.value;
};

window.addEventListener("scroll", function () {
  nuevoEstilo();
});

const nuevoEstilo = () => {
  var navegacion = document.querySelector(".navegacion");
  var enlaces = document.querySelectorAll(".navegacion__enlace");

  if (window.scrollY > 70) {
    navegacion.classList.add("background__ver");
    enlaces.forEach(function (enlace) {
      enlace.classList.add("cambiar__fuente");
    });
  } else {
    navegacion.classList.remove("background__ver");
    enlaces.forEach(function (enlace) {
      enlace.classList.remove("cambiar__fuente");
    });
  }
};
</script>

<template>
  <div>
    <!-- nav movil -->
    <div class="nav__movil">
      <div class="navegacion__logo--movil">
        <RouterLink :to="{ name: 'home' }">
          <img
            src="/img/logos/logo_goberptyo.png"
            alt="Putumayo"
            :style="{ display: navMovil ? 'none' : 'block' }"
          />
        </RouterLink>
      </div>
      <!-- boton movil  -->
      <button @click="mostrarNavMovil" id="menu__movil" class="menu__movil">
        <font-awesome-icon v-if="!navMovil" :icon="['fas', 'bars']" />
        <font-awesome-icon v-else :icon="['fas', 'x']" />
      </button>
      <!-- fin boton movil -->
    </div>
    <!--fin nav movil -->

    <div
      class="navegacion"
      :class="{ navegacion__show: navMovil }"      
    >
      <div class="navegacion__logo">
        <RouterLink :to="{ name : 'home' }">
          <img
            src="/img/logos/logo_goberptyo.png"
            alt="Putumayo"
          />
        </RouterLink>
      </div>
      <!-- barra de navegacion -->
      <nav class="navegacion__barra">
        <RouterLink
          :to="{ name : 'home' }"
          class="navegacion__link"
          active-class="navegacion__link-seleccion"
        >
          Inicio
        </RouterLink>

        <RouterLink
          :to="{ }"
          class="navegacion__link"
          active-class="navegacion__link-seleccion"
        >
          Gobernación
        </RouterLink>
        
        <RouterLink
          :to="{ name: 'auth' }"
          class="navegacion__link navegacion__link--loging"
        >
          <div class="link-content">
            <svg 
              class="icon_r_auth"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor">
              <path 
                d="M3.78307 2.82598L12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598ZM5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879L5 4.60434ZM12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5C14.5 9.88071 13.3807 11 12 11ZM7.52746 16C7.77619 13.75 9.68372 12 12 12C14.3163 12 16.2238 13.75 16.4725 16H7.52746Z">
              </path>
            </svg>
            <span>Ingresar</span>
          </div>
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
/* navegacion */
.navegacion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 0 0 1rem 0;
  transition: 0.6s ease-in-out all;
}

.navegacion__barra {
  display: flex;
  gap: 0.5rem;
  padding: 0 5rem;
}

.navegacion__link {
  display: inline-flex; /* Ensure the link itself is inline-flex */
  align-items: center; /* Align items vertically in the center */
  text-decoration: none; /* Remove underline from links */
  color: inherit; /* Inherit text color */
}

.link-content {
  display: flex; /* Use flexbox for the content inside the link */
  align-items: center; /* Align items vertically in the center */
  color: #004884;
}

.icon_r_auth {
  width: 1rem;
  height: auto;
  margin-right: 0.5rem; /* Space between icon and text */
}

@media (max-width: 992px) {
  .navegacion__barra {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
  }
}

@media (max-width: 992px) {

  .navegacion {
    flex-direction: column;
    align-items: end;
    gap: 1rem;
    padding-top: 1rem;
    margin: 0;
    position: absolute;
    top: 0;
    width: 100%;
    left: -100%;
    height: 100%;
    transform: translateX(-100%);
    opacity: 0.9;
    justify-content: start;
    font-size: 1rem;
    z-index: 1;
  }

  .item__show {
    display: block;
  }

  .navegacion__link {
    color: var(--blanco);
  }
  .navegacion__link:first-of-type,
  .navegacion__link:last-of-type {
    margin-top: 2rem;
  }
}

@media (max-width: 992px) {
  .navegacion__show {
    transform: translateX(26%);
  }
}

@media (max-width: 768px) {
  .navegacion__show {
    transform: translateX(40%);
  }
}
@media (max-width: 468px) {
  .navegacion__show {
    transform: translateX(50%);
  }
}

.navegacion__link {
  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.075);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem;
  text-transform: uppercase;
  transition: background-color 0.3s;
}

.navegacion__link:hover {
  backdrop-filter: blur(
    5px
  ); /* Cambia el valor según el nivel de desenfoque que desees */
  opacity: 1;
  background-color: rgba(38, 47, 33, 0.3);
  border-radius: 5px;
}
.navegacion__link--loging {
  background-color: var(--primary);
  border-radius: 5px;
  color: var(--blanco);
}
.navegacion__link--loging:hover {
  background-color: var(--primary-hover);
}
.navegacion__link-seleccion {
  color: var(--blanco);
}
.navegacion__logo {
  max-width: 5rem;
  width: 4.5rem;
  margin-top: 0.5rem;
  margin-left: 1rem;
  height: auto;
  /* padding: 0 3rem; */ /* Comentar o ajustar esto */
  position: relative;
  z-index: 1000; /* Asegura que esté por encima de otros elementos */
}

@media (min-width: 1820px) {
  .navegacion__link {
    font-size: .9rem;
  }
}

/* movil responsive */

.nav__movil {
  display: none;
  padding: 1rem 0;
}

.menu__movil {
  font-size: 2rem;
  padding: 0 1.5rem;
  background: none;
}

.menu__movil:hover {
  color: var(--primary-hover);

}

.navegacion__logo--movil {
  padding: 0 2rem;
}

@media (max-width: 992px) {
  .nav__movil {
    display: flex;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  .navegacion__logo--movil {
    width: 4rem;
    padding: 0 2rem;
  }
}

@media (max-width: 768px) {
  .navegacion__logo--movil {
    max-width: 3.2rem;
    padding: 0rem;
  }
}
</style>