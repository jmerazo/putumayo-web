<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/users";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref(null);

const handleLogin = async () => {
  const credentials = {
    email: email.value,
    password: password.value,
  };
  try {
    const response = await store.login(credentials, 'local');

    if (response.success) {
      router
        .push({
          name: "dashboard", // Nombre de la ruta de la vista del panel
        })
        .catch((err) => {});
    } else {
      showLoginError("Credenciales inválidas");
    }
  } catch (e) {
    showLoginError(e.message);
  }
};

const showLoginError = (message) => {
  error.value = message;
  setTimeout(() => {
    error.value = null;
  }, 3000); // El mensaje de error desaparecerá después de 3 segundos
};

localStorage.removeItem("hasReloaded");
function generateRandomString() {
  const array = new Uint32Array(10);
  window.crypto.getRandomValues(array);
  return array.join('');
}
</script>

<template>
    <div class="background">
      <div class="container">
        <div class="form-header">
          <h2>Inicio de Sesión</h2>
        </div>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="email">Email:</label>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    v-model="email"
                    placeholder="Escribe tu email" 
                    required
                >
            </div>
            <div class="form-group">
                <label for="password">Contraseña:</label>
                <input 
                    type="password"
                    id="password"
                    v-model="password"
                    placeholder="Ingresar contraseña"
                    required
                >
            </div>
            <div class="form-group">
                <button type="submit">Iniciar Sesión</button>
            </div>
        </form>
        <div class="form-group">
          <a type="button" href="/register">Registrar</a>
        </div>
      </div>
    </div>
</template>
  
<style scoped>
.background {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url('path-to-your-background-image.jpg') no-repeat center center;
    background-size: cover;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 10px;
    padding: 2rem;
    max-width: 300px;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.form-header h1, .form-header h2 {
    margin: 0 0 1rem;
}

.form-group {
    margin-bottom: 1rem;
    width: 100%;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
}

.form-group input {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group button {
    width: 100%;
    padding: 0.75rem;
    background-color: #646cff;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
}

.form-group button:hover {
    background-color: #535bf2;
}

.form-group a {
    display: inline-block;
    margin-top: 1rem;
    color: #646cff;
    text-decoration: none;
}

.form-group a:hover {
    text-decoration: underline;
}
</style>  