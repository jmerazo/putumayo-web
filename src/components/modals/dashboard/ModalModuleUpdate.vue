<script setup>
import { ref, watch } from 'vue';
import { useModalStore } from "@/stores/modal";
import { useUtilsStore } from "@/stores/utils";
import { getFullImageUrl } from "@/helpers/";

const modal = useModalStore();
const storeUtils = useUtilsStore();
const error = ref("");
const iconPreview = ref("");

const formData = ref({
  name: '',
  route: ''
});

const initializeFormData = () => {
  const selectedModule = storeUtils.moduleSelected[0];

  if (selectedModule) {
    formData.value = {
      name: selectedModule.name || "",
      route: selectedModule.route || "",
    };
    iconPreview.value = getFullImageUrl(selectedModule.icon);
  }
};

watch(
  () => storeUtils.moduleSelected,
  () => {
    initializeFormData();
  }
);

const fileInput = ref(null);

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
  iconPreview.value = "";

  if (fileInput.value) {
    fileInput.value.value = null;
  }
}

function validateFields(obj) {
  return Object.values(obj).some((value) => value === "");
}

async function updateModule() {
  if (validateFields(formData.value)) {
    showError("Complete all fields");
    return;
  }

  try {
    const formDataUpload = new FormData();
    formDataUpload.append('name', formData.value.name);
    formDataUpload.append('route', formData.value.route);
    if (fileInput.value.files[0]) {
      formDataUpload.append('icon', fileInput.value.files[0]);
    }

    const response = await storeUtils.moduleUpdate(storeUtils.moduleSelected[0].id, formDataUpload);
    
    if (response.status === 201) {
      resetForm();
      modal.handleClickModalModuleUpdate();
    } else {
      showError("Error creating module");
    }
  } catch (error) {
    console.error("Error creating module:", error);
    showError("Ocurrió un error al procesar la solicitud.");
  }
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      iconPreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
    else {
    console.log('No file selected');
  }
}

function handleDrop(event) {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      iconPreview.value = e.target.result;
      if (fileInput.value) {
        fileInput.value.files = event.dataTransfer.files;
      }
    };
    reader.readAsDataURL(file);
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
  <div class="modal" v-if="modal.modalModuleUpdate">
    <div class="modal__contenido">
      <div class="form__modal--content">
        <div class="header">
          <button type="button" class="btn__closew" @click="modal.handleClickModalModuleUpdate(), resetForm()">
            <img src="/icons/icon_close_line.svg" alt="Close windows" class="btn__icon__closew">
          </button>
        </div>

        <h3 class="form__modal--title">Module Add</h3>
        <hr>
        <form class="form__modal" @submit.prevent="updateModule">
          <div class="form__modal--field">
            <label class="form__modal--label">Name: </label>
            <input class="form__modal--input" type="text" v-model="formData.name" />
          </div>     

          <div class="form__modal--field">
            <label class="form__modal--label">Route: </label>
            <input class="form__modal--input" type="text" v-model="formData.route" />
          </div>

          <div class="form__modal--field input__uploadImage">
            <label for="fileInput" class="form__modal--label">Icon:</label>
            <label for="fileInput" class="custom-file-upload" @dragover.prevent @drop="handleDrop">
              <div class="drop-area" @dragover.prevent @drop="handleDrop">
                <div v-if="!iconPreview" class="img__specieUploadPhoto">
                  <img src="/icons/icon_upload_photo.svg" alt="Imagen de arrastre o clic" style="width: 50px; height: auto; margin-bottom: 5px" />
                  <p style="padding: 0; margin: 0">Arrastra o selecciona un archivo</p>
                </div>
                <div v-else class="img__specieUploadPhotoSelect">
                  <img class="img_specie_selected" :src="iconPreview" alt="Imagen seleccionada" />
                  <p>{{ iconPreview }}</p>
                </div>
              </div>
              <input id="fileInput" type="file" ref="fileInput" accept="image/*" @change="handleFileChange" />
            </label>
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

/* Estilos para el diseño personalizado del input de archivo */
.custom-file-upload {
  display: inline-block;
  cursor: pointer;
}

.drop-area {
  position: relative;
  width: 100%;
  height: auto;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
}

.drop-area img {
  margin-bottom: 10px;
}
.input__uploadImage {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}

.img__specieUploadPhotoSelect {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  word-break: break-all; /* Para romper la URL en palabras largas */
}

.img_specie_selected {
  max-width: 100%;
  max-height: 200px; /* Ajusta esto según sea necesario */
  object-fit: contain; /* Asegura que la imagen se ajuste dentro del contenedor */
  margin-bottom: 10px; /* Espaciado entre la imagen y el texto de la URL */
}

.img__specieUploadPhotoSelect p {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis; /* Añade puntos suspensivos si la URL es muy larga */
  white-space: nowrap;
}

.img__specieUploadPhoto {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#fileInput {
  display: none;
}
</style>