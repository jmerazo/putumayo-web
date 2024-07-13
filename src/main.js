import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "../src/assets/styles.css";
import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/users';


const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');