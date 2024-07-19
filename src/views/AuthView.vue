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

const handleGoogleLogin = () => {
  // Lógica para el login con Google
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
    <div class="login-container">
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
            placeholder="Digite tu email" 
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
          <div class="g-recaptcha" data-sitekey="your-site-key"></div>
        </div>
        <div class="form-group">
          <button type="submit">Continuar</button>
        </div>
      </form>
      <div class="form-group">
        <a type="button" href="/register">¿Aún no tienes una cuenta en Intranet Putumayo? Regístrate</a>
      </div>
      <div class="login-social">
        <span>Iniciar sesión con:</span>
        <button @click="handleGoogleLogin" class="google-login-btn">
          <img src="/icons/icon_google.png" alt="Google login" class="google-icon">
          Google
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  background-color: #f5f5f5;
  padding: 1rem;
}

.login-container {
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.form-header h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #0d6efd;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.form-group .g-recaptcha {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.form-group button {
  width: 100%;
  padding: 0.75rem;
  background-color: #0d6efd;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-group button:hover {
  background-color: #0056b3;
}

.form-group a {
  display: block;
  margin-top: 1rem;
  color: #0d6efd;
  text-decoration: none;
  font-size: 0.9rem;
}

.form-group a:hover {
  text-decoration: underline;
}

.login-social {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.google-login-btn {
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  padding: 0.75rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  margin-top: 0.5rem;
}

.google-login-btn:hover {
  background-color: #f5f5f5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.google-icon {
  width: 20px;
  height: 20px;
}

.login-social span {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}
</style>
