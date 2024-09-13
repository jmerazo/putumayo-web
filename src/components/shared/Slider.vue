<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const paginaInicio = computed(() => route.name === "home");

// Carrusel de imágenes header
const images = [
  "/img/slider/img_001.jpg", 
  "/img/slider/img_002.jpg"
];

const currentImage = ref(images[0]);

// Definir currentIndex basado en currentImage
const currentIndex = computed(() => images.indexOf(currentImage.value));

onMounted(() => {
  setInterval(() => {
    changeBackgroundImage(1);
  }, 5000);
});

function changeBackgroundImage(direction = 1) {
  const currentIndexValue = images.indexOf(currentImage.value);
  const nextIndex = (currentIndexValue + direction + images.length) % images.length;
  currentImage.value = images[nextIndex];
}
</script>

<template>
  <header class="header" :style="
      !paginaInicio
        ? {
            'background-color': '#eaf2ed',
            height: '0px',
            color: '#ffffff',
            backgroundImage: 'none',
          }
        : { backgroundImage: 'url(' + currentImage + ')'}
    ">
    <!-- Imágenes con fade-in/out -->
    <div
      v-for="(image, index) in images"
      :key="index"
      class="header__image"
      :class="{ active: index === currentIndex }"
      :style="{ backgroundImage: 'url(' + image + ')' }"
    ></div>

    <!-- Botones para cambiar imagen -->
    <button class="nav-button left" @click="changeBackgroundImage(-1)">&#10094;</button>
    <button class="nav-button right" @click="changeBackgroundImage(1)">&#10095;</button>

    <!-- Indicadores -->
    <div class="indicators">
      <span
        v-for="(image, index) in images"
        :key="index"
        :class="['dot', { active: index === currentIndex }]"
      ></span>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  height: 600px;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  color: white;
  width: 100%;
  top: 0;
  overflow: hidden;
}

.header__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  transition: opacity 1.5s ease-out;
  opacity: 0;
  z-index: 0;
}

.header__image.active {
  opacity: 1;
  z-index: 1;
}

.header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 3;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: rgba(255, 255, 255, 1);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 3;
}

.nav-button.left {
  left: 10px;
}

.nav-button.right {
  right: 10px;
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

@media (min-width: 1900px) {
  .header {
    height: 850px;
  }
}
</style>