<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from "../stores/users";
import { useUtilsStore } from "../stores/utils";
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { getFullNewsImageUrl } from '@/helpers/'

const store = useUserStore();
const storeUtils = useUtilsStore();

const events = ref([]);
const selectedEvent = ref(null); // Para almacenar el evento seleccionado
const showEventDetails = ref(false); // Para mostrar u ocultar la etiqueta
const news = ref([])

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth', // Tipo de vista inicial
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  locale: esLocale, // Cambia el idioma a español
  editable: true,
  selectable: true,
  dayMaxEvents: true, // permite mostrar más eventos
  eventClick: handleEventClick,
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

onMounted(async () => {
    news.value = await storeUtils.loadNews()
    console.log('news: ', news.value)
    const loadedEvents = await storeUtils.loadCalendarEvents();
    if (loadedEvents) {
        events.value = loadedEvents.map(event => ({
        title: event.title,
        start: event.start_time,
        end: event.end_time,
        allDay: event.allDay || false, // Manejo de eventos de todo el día
        backgroundColor: getRandomColor(), // Asignar un color aleatorio a cada evento
        borderColor: 'transparent', // Para que el borde coincida con el fondo
        extendedProps: {
            description: event.description,
            c_dependencie: event.c_dependencie,
            c_subdependencie: event.c_subdependencie,
            organizer: event.organizer,
            dependency: event.dependency,
            official_document: event.official_document,
            start: event.start_time,
            end: event.end_time,
        }
        }));
        calendarOptions.value.events = events.value; // Asignamos los eventos cargados
    } else {
        console.error("No se cargaron eventos");
    }
});

function handleEventClick(info) {
  selectedEvent.value = info.event.extendedProps; // Guarda la información del evento seleccionado
  showEventDetails.value = true; // Muestra la etiqueta con la información del evento
}

// Función para formatear la fecha
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};
</script>

<template>
    <v-container fluid>
        <v-row>
        <!-- Columna del Calendario (80% del ancho) -->
        <v-col cols="12" md="9">
            <div class="container__calendar">
            <FullCalendar :options="calendarOptions" class="fullcalendar" />
            </div>
            <div v-if="showEventDetails" class="event-details">
            <h3>{{ selectedEvent.title }}</h3>
            <p><strong>Organizador:</strong> {{ selectedEvent.organizer.first_name }} {{ selectedEvent.organizer.last_name }}</p>
            <p><strong>Dependencia:</strong> {{ selectedEvent.dependency.name }}</p>
            <p><strong>Descripción:</strong> {{ selectedEvent.description }}</p>       
            <p><strong>Documento oficial:</strong>
                <a :href="selectedEvent.official_document" target="_blank">Descargar</a>
            </p>
            <p><strong>Fecha inicio:</strong> {{ selectedEvent.start }}</p>  
            <p><strong>Fecha Fin:</strong> {{ selectedEvent.end }}</p>   
            <v-btn @click="showEventDetails = false" color="primary" class="mt-3">Cerrar</v-btn>
            </div>
        </v-col>

        <!-- Columna del iframe de Facebook (20% del ancho) -->
        <v-col cols="12" md="3">
            <div class="facebook-page">
            <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fweb.facebook.com%2Fgobernaciondelputumayo&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="100%"
                height="550"
                style="border:none;overflow:hidden"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
            </div>
        </v-col>
        </v-row>
    </v-container>

    <!-- Sección de Noticias -->
    <v-container class="news-section">
    <v-row>
      <v-col cols="12">
        <h2 class="news-title">Últimas Noticias</h2>
      </v-col>
    </v-row>

    <!-- Noticias -->
    <v-row>
      <v-col
        v-for="(item, index) in news"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto news-card" max-width="344" outlined>
          <!-- Imagen con efecto de zoom -->
          <v-img
            :src="getFullNewsImageUrl(item.featured_image)"
            height="200px"
            class="news-image"
          ></v-img>
          <!-- Título con tooltip -->
          <v-card-title class="news-card-title" :title="item.title">{{ item.title }}</v-card-title>
          <!-- Fecha de la noticia -->
          <v-card-subtitle class="news-date">{{ formatDate(item.publication_date) }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Estilo para la página de Facebook */
.facebook-page {
  padding: 10px;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: var(--govco-card-box-shadow);
}

.container__calendar{
    margin: 2rem;
}

.fullcalendar{
    max-height: 550px;
}

/* Estilo general de FullCalendar adaptado al estilo Govco */
.fc .fc-toolbar {
  font-family: var(--fuente-principal);
  background-color: var(--background-color);
  padding: 5px; /* Reduce el padding para hacer el calendario más compacto */
  border-radius: 8px;
  box-shadow: var(--govco-card-box-shadow);
}

.fc .fc-button {
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 4px;
  font-family: var(--fuente-principal);
  padding: 5px 8px; /* Ajusta el padding de los botones */
}

.fc .fc-button:hover {
  background-color: var(--secondary-color);
}

.fc .fc-daygrid-event {
  background-color: var(--primary-color);
  color: white;
  border: none;
  font-family: var(--fuente-secundaria);
  font-size: 0.7rem; /* Tamaño de la fuente de los eventos */
  padding: 1px 3px; /* Ajuste del padding en los eventos */
}

.fc .fc-daygrid-event:hover {
  background-color: var(--secondary-color);
}

.fc .fc-col-header-cell-cushion {
  color: var(--text-color);
  font-family: var(--fuente-secundaria);
  padding: 5px; /* Reduce el padding de los encabezados */
  font-size: 0.7rem; /* Tamaño de fuente más pequeño en encabezados */
}

.fc .fc-daygrid-day-number {
  color: var(--text-color);
  font-family: var(--fuente-secundaria);
  font-size: 0.7rem; /* Tamaño de fuente del número de día */
}

.fc .fc-daygrid-day:hover {
  background-color: var(--hover-color);
}

.fc .fc-highlight {
  background-color: var(--accent-color);
}

.fc .fc-event-title {
  font-size: 0.75rem; /* Ajuste del tamaño de la fuente del título de evento */
}

.fc-theme-standard .fc-scrollgrid {
  border: 1px solid var(--govco-card-border-color);
  border-radius: 8px;
}

.fc .fc-toolbar-title {
  font-family: var(--fuente-principal);
  font-size: 1.2rem; /* Tamaño más pequeño del título */
  color: var(--text-color);
}

.fc .fc-today-button {
  background-color: var(--primary-color);
  color: #fff;
  font-family: var(--fuente-secundaria);
}

.fc .fc-prev-button, .fc .fc-next-button {
  background-color: var(--primary-color);
  color: #fff;
}

.fc .fc-prev-button:hover, .fc .fc-next-button:hover {
  background-color: var(--secondary-color);
}

.fc .fc-daygrid {
  font-size: 0.75rem; /* Reducir el tamaño de las celdas */
}

.fc .fc-daygrid-day-frame {
  min-height: 30px; /* Ajustar la altura mínima de las celdas */
}

.fc .fc-daygrid-block-event .fc-event-title {
  font-size: 0.6rem; /* Tamaño más pequeño para los títulos de eventos */
}

.fc .fc-scroller-harness {
  max-height: 400px; /* Ajustar la altura máxima del calendario */
}

.event-details {
  background-color: var(--background-color);
  padding: 20px;
  border: 1px solid var(--govco-card-border-color);
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: var(--govco-card-box-shadow);
}

.event-details h3 {
  font-family: var(--fuente-principal);
  color: var(--primary-color);
}

.event-details p {
  font-family: var(--fuente-principal);
  color: var(--text-color);
  margin: 5px 0;
}

/* Estilo para el botón de cierre */
.v-btn {
  background-color: var(--primary-color);
  color: #fff;
  font-family: var(--fuente-principal);
}

.v-btn:hover {
  background-color: var(--secondary-color);
}

/* Sección de noticias */
.news-section {
  margin-top: 2rem;
}

/* Título de la sección de noticias */
.news-title {
  font-family: var(--fuente-principal);
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

/* Sección de noticias */
.news-section {
  margin-top: 2rem;
}

/* Tarjeta de noticia */
.news-card {
  transition: transform 0.3s ease;
}

/* Efecto de zoom en la imagen */
.news-image {
  transition: transform 0.3s ease;
}

.news-image:hover {
  transform: scale(1.05);
}

/* Título con tooltip y estilo */
.news-card-title {
  font-family: var(--fuente-secundaria);
  font-size: 1.2rem;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

/* Fecha de la noticia */
.news-date {
  font-family: var(--fuente-secundaria);
  font-size: 0.9rem;
  color: var(--text-color);
  margin-top: -10px;
}

/* Zoom suave al pasar el cursor por la tarjeta */
.news-card:hover {
  transform: scale(1.02);
}
</style>
