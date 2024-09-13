import { createApp } from 'vue';
import { createPinia } from 'pinia';
import "../src/assets/styles.css";
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Crear instancia de Pinia
const pinia = createPinia();

// Crear instancia de la aplicación Vue
const app = createApp(App);
const vuetify = createVuetify({
    components,
    directives,
});

app.use(pinia);
app.use(router);
app.use(vuetify);

// Montar la aplicación
app.mount('#app');