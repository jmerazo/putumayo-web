<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useModalStore } from "@/stores/modal";
import { useUtilsStore } from "@/stores/utils";
import { usePersonStore } from '@/stores/person'

const person = usePersonStore();
const modal = useModalStore();
const storeUtils = useUtilsStore();
const error = ref("");
const persons = ref([]);

onMounted(async () => {
  await person.getPersons();
  persons.value = person.personsList;
  console.log('persons: ', persons.value)
});

const formData = ref({
  name: '',
  d_person: '',
  acronym: '',
});

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

function validateFields(obj) {
  return Object.values(obj).some((value) => value === "");
}

async function createDependencie() {
  if (validateFields(formData.value)) {
    showError("Complete all fields");
    return;
  }

  try {
    await storeUtils.createDependencie(formData.value);
    resetForm();
    modal.handleClickModalDependencieAdd()
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      alert(error.response.data.error);
    } else {
      alert("Ocurrió un error al procesar la solicitud.");
    }
  }
}

const showError = (message) => {
  error.value = message;
  setTimeout(() => {
    error.value = null;
  }, 3000);
};
</script>

<template>
  <div class="modal" v-if="modal.modalDependencieAdd">
    <div class="modal__contenido">
      <div class="form__modal--content">
        <div class="header">
          <button type="button" class="btn__closew" @click="modal.handleClickModalDependencieAdd(), resetForm()">
            <img src="/icons/icon_close_line.svg" alt="Close windows" class="btn__icon__closew">
          </button>
        </div>

        <h3 class="form__modal--title">Dependencie Add</h3>
        <hr>
        <form class="form__modal" @submit.prevent="createDependencie">
          <div class="form__modal--field">
            <label class="form__modal--label">Name: </label>
            <input class="form__modal--input" type="text" v-model="formData.name" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label" for="a_rol">Asign user:</label>
            <select id="d_person" class="form__modal--input" v-model="formData.d_person">
              <option value="" selected disabled>Select person...</option>
              <option v-for="p in persons" :key="p.id" :value="p.id">
                {{ p.first_name + " " + p.last_name }}
              </option>
            </select>
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Acronym: </label>
            <input class="form__modal--input" type="text" v-model="formData.acronym" />
          </div>         

          <hr>

          <p class="msg__error" v-if="error">{{ error }}</p>

          <div class="container">
            <button type="submit" class="btn__save">
              <img src="/icons/icon_save_line.svg" alt="Save" class="btn__icon__save">
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.msg__error {
  padding: 0;
  margin: 0;
  text-align: center;
  border-left: 4px solid var(--red);
  padding-left: 2rem;
  color: var(--red);
}

.selected {
  background-color: var(--secondary-color); /* Color de fondo para elementos seleccionados */
}

.module-permissions {
  margin-top: 1rem;
}

.header {
  display: flex;
  justify-content: flex-end;
}

.container {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Alinea el contenido al final del contenedor */
}

.password-container {
  position: relative;
  display: flex;
  align-items: center;
}

.form__modal--input {
  width: 100%;
  padding-right: 2.5rem; /* Ajusta el padding para dejar espacio para el icono */
  font-family: var(--fuente-principal); /* Asegura que la fuente principal se aplique */
  border: none;
  border-bottom: 2px solid var(--text-color); /* Línea base neutral */
}

.underline-neutral {
  border-bottom: 2px solid var(--text-color); /* Línea base neutral */
}

.underline-match {
  border-bottom: 2px solid green;
}

.underline-mismatch {
  border-bottom: 2px solid red;
}

.btn__toggle {
  position: absolute;
  right: 0.5rem; /* Ajusta la posición del icono a la derecha del input */
  top: 50%;
  transform: translateY(-50%); /* Centra verticalmente el icono */
  background: transparent; /* Fondo transparente */
  border: none; /* Sin borde */
  cursor: pointer; /* Cursor de mano */
}

.btn__icon__toggle {
  width: 1.5rem; /* Ajusta el tamaño del icono según sea necesario */
  height: 1.5rem;
}

.btn__closew {
  background-color: transparent; /* Fondo transparente */
  border: none; /* Sin borde */
  padding: 0; /* Sin relleno */
  cursor: pointer; /* Cursor de mano */
  margin-left: auto; /* Empuja el botón al extremo derecho */
}

.btn__icon__closew {
  width: 1.5rem; /* Ajusta el tamaño del icono según sea necesario */
  height: 1.5rem;
}

.btn__save {
  background-color: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
}

.btn__icon__save {
  width: 1.5rem; /* Ajusta el tamaño del icono según sea necesario */
  height: 1.5rem;
}

/* content general */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  z-index: 11000;
  font-size: 1rem;
}

.modal__contenido {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 95%;
  max-height: 83%;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  z-index: 1000;
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .modal__contenido {
    margin-top: 0;
  }
}

@media (min-width: 992px) {
  .modal__contenido {
    width: 50%;
    margin-top: 1rem;
  }
}

@media (min-width: 1440px) {
  .modal__contenido {
    width: 40%;
  }
}

@media (min-width: 1820px) {
  .modal__contenido {
    width: 30%;
  }
}

.form__modal--title {
  color: var(--primary-color);
}

.form__modal--input {
  border: 1px solid var(--sidebar-gray-background);
  border-radius: 4px;
  padding: 0.5rem;
  width: 100%;
}

.form__modal--label {
  color: var(--text);
  font-weight: bold;
}

.form__modal--field {
  margin-bottom: 1rem;
}
</style>