<script setup>
import { ref, computed, watch } from 'vue';
import { useUserStore } from "@/stores/users";
import { useModalStore } from "@/stores/modal";
import { useUtilsStore } from "@/stores/utils";

const storeUser = useUserStore();
const modal = useModalStore();
const storeUtils = useUtilsStore();
const error = ref("");

const formData = ref({
  a_rol: '',
  a_group: '',
  is_active: 1,
  ump_module: [],
  a_dependencie: '',
  a_subdependencie: '',
  module_permissions: {},
  selected_submodules: {},
  submodule_permissions: {}
});

const initializeFormData = () => {
  const selectedUser = storeUser.userSelected[0];
  console.log('user info: ', selectedUser);

  if (selectedUser) {
    // Inicializar formData
    formData.value = {
      a_rol: selectedUser.a_rol?.id || "",
      a_group: selectedUser.a_group[0]?.id || "", // Asumiendo que a_group es una lista
      is_active: selectedUser.is_active || 1,
      ump_module: selectedUser.modules.map(module => module.id) || [], // Asumiendo que modules es una lista de módulos
      a_dependencie: selectedUser.a_dependencie?.id || "", // Asumiendo que a_dependencie es un objeto con id
      a_subdependencie: selectedUser.a_subdependencie?.id || "", // Asumiendo que a_subdependencie es un objeto con id
      module_permissions: {},
      selected_submodules: {},
      submodule_permissions: {}
    };

    // Inicializar module_permissions y submodule_permissions
    selectedUser.modules.forEach(module => {
      formData.value.module_permissions[module.id] = (module.permissions || []).map(permission => permission.id);

      // Inicializar submódulos y sus permisos
      const submodules = module.submodules || [];
      formData.value.selected_submodules[module.id] = submodules.map(submodule => submodule.id);
      submodules.forEach(submodule => {
        formData.value.submodule_permissions[submodule.id] = (submodule.permissions || []).map(permission => permission.id);
      });
    });
  }
};

watch(
  () => storeUser.userSelected,
  () => {
    initializeFormData();
  }
);

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

function validateFields(obj) {
  return Object.values(obj).some((value) => value === "");
}

async function userUpdate() {
  if (validateFields(formData.value)) {
    showError("Complete all fields");
    return;
  }

  console.log('data save user: ', formData.value)

  try {
    const response = await storeUser.userUpdate(storeUser.userSelected[0].id, formData.value);
    console.log('response: ', response)
    if(response.status === 200){
      resetForm();
      modal.handleClickModalUserUpdate()
    }    
  } catch (error) {
    console.log('error modal: ', error)
    if (error.response && error.response.data && error.response.data.error) {
      alert(error.response.data.error);
    } else {
      alert("An error occurred while processing the request.");
    }
  }
}

const showError = (message) => {
  error.value = message;
  setTimeout(() => {
    error.value = null;
  }, 3000);
};

const flattenSubdependencies = (nestedSubdependencies) => {
  return nestedSubdependencies.reduce((acc, val) => acc.concat(val), []);
};

const filteredSubs = computed(() => {
  const { a_dependencie } = formData.value;

  if (a_dependencie) {
    // Aplanar las subdependencias
    const allSubdependencies = flattenSubdependencies(storeUtils.subdependencies);

    // Filtrar por dependencia
    const filtered = allSubdependencies.filter(
      (sub) => sub.dependencie.id === a_dependencie
    );
    return filtered;
  }
  return [];
});

function toggleSelection(event, field, value) {
  event.preventDefault();
  const index = formData.value[field].indexOf(value);
  if (index > -1) {
    formData.value[field].splice(index, 1);
    if (field === 'ump_module') {
      delete formData.value.module_permissions[value]; // Eliminar permisos al deseleccionar módulo
      delete formData.value.selected_submodules[value]; // Eliminar submódulos al deseleccionar módulo
    }
  } else {
    formData.value[field].push(value);
    if (field === 'ump_module') {
      formData.value.module_permissions[value] = []; // Inicializar permisos para el módulo seleccionado
      formData.value.selected_submodules[value] = []; // Inicializar submódulos para el módulo seleccionado
    }
  }
}

function togglePermission(moduleId, permissionId) {
  const permissions = formData.value.module_permissions[moduleId];
  const index = permissions.indexOf(permissionId);
  if (index > -1) {
    permissions.splice(index, 1);
  } else {
    permissions.push(permissionId);
  }
}

function getModuleName(moduleId) {
  const module = storeUtils.modules.find(m => m.id === moduleId);
  return module ? module.name : 'Unknown Module';
}

function getSubmodulesByModule(moduleId) {
  return storeUtils.submodules.filter(submodule => submodule.sm_module.id === moduleId);
}

function toggleSubmodulePermission(submoduleId, permissionId) {
  if (!formData.value.submodule_permissions[submoduleId]) {
    formData.value.submodule_permissions[submoduleId] = [];
  }

  const permissions = formData.value.submodule_permissions[submoduleId];
  const index = permissions.indexOf(permissionId);
  if (index > -1) {
    permissions.splice(index, 1);
  } else {
    permissions.push(permissionId);
  }
}

function toggleSubmoduleSelection(event, moduleId, submoduleId) {
  event.preventDefault();
  if (!formData.value.selected_submodules[moduleId]) {
    formData.value.selected_submodules[moduleId] = [];
  }

  const submodules = formData.value.selected_submodules[moduleId];
  const index = submodules.indexOf(submoduleId);
  if (index > -1) {
    submodules.splice(index, 1);
    delete formData.value.submodule_permissions[submoduleId];
  } else {
    submodules.push(submoduleId);
    formData.value.submodule_permissions[submoduleId] = [];
  }
}

function getSubmoduleName(submoduleId) {
  const submodule = storeUtils.submodules.find(s => s.id === submoduleId);
  return submodule ? submodule.name : 'Unknown Submodule';
}
</script>

<template>
  <div class="modal" v-if="modal.modalUserUpdate">
    <div class="modal__contenido">
      <div class="form__modal--content">
        <div class="header">
          <button type="button" class="btn__closew" @click="modal.handleClickModalUserUpdate(), resetForm()">
            <img src="/icons/icon_close_line.svg" alt="Close windows" class="btn__icon__closew">
          </button>
        </div>

        <h3 class="form__modal--title">User Update</h3>
        <hr>
        <form class="form__modal" @submit.prevent="userUpdate">
          <div class="form__modal--field">
            <label class="form__modal--label" for="a_rol">Role:</label>
            <select id="a_rol" class="form__modal--input" v-model="formData.a_rol">
              <option value="" selected disabled>Select rol...</option>
              <option v-for="r in storeUtils.roles" :key="r.id" :value="r.id">
                {{ r.name }}
              </option>
            </select>
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label" for="a_group">Group:</label>
            <select id="a_group" class="form__modal--input" v-model="formData.a_group">
              <option value="" selected disabled>Select group...</option>
              <option v-for="g in storeUtils.groups" :key="g.id" :value="g.id">
                {{ g.name }}
              </option>
            </select>
          </div>

          <hr>

          <div class="form__modal--field">
            <label class="form__modal--label" for="dependencie">Dependencie:</label>
            <select id="dependencie" class="form__modal--input" v-model="formData.a_dependencie">
              <option value="" selected disabled>Select dependencie...</option>
              <option v-for="d in storeUtils.dependencies" :key="d.id" :value="d.id">
                {{ d.name }}
              </option>
            </select>
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label" for="subdependencie">Subdependencie:</label>
            <select id="subdependencie" class="form__modal--input" v-model="formData.a_subdependencie">
              <option value="" disabled selected>Select subdependencie...</option>
              <option v-for="s in filteredSubs" :key="s.id" :value="s.id">
                {{ s.name }}
              </option>
            </select>
          </div>

          <hr>

          <div class="form__modal--field">
            <label class="form__modal--label">Modules and Permissions:</label>
            <div class="modules-list">
              <div v-for="module in storeUtils.modules" :key="module.id" class="module-item">
                <input type="checkbox" :id="'module-' + module.id" :value="module.id" v-model="formData.ump_module">
                <label :for="'module-' + module.id">{{ module.name }}</label>
                <div v-if="formData.ump_module.includes(module.id)" class="submodules-container">
                  <div class="submodules-list" v-if="module.submodules && module.submodules.length">
                    <label class="form__modal--label">Submodules:</label>
                    <div v-for="submodule in module.submodules" :key="submodule.id" class="submodule-item">
                      <input type="checkbox" :id="'submodule-' + submodule.id" :value="submodule.id" v-model="formData.selected_submodules[module.id]">
                      <label :for="'submodule-' + submodule.id">{{ submodule.name }}</label>
                      <div v-if="formData.selected_submodules[module.id] && formData.selected_submodules[module.id].includes(submodule.id)">
                        <label class="form__modal--label">Permissions:</label>
                        <div v-for="permission in storeUtils.permissions" :key="permission.id" class="permission-item">
                          <input type="checkbox" :id="'permission-' + submodule.id + '-' + permission.id" :value="permission.id" v-model="formData.submodule_permissions[submodule.id]">
                          <label :for="'permission-' + submodule.id + '-' + permission.id">{{ permission.name }}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <label class="form__modal--label">Permissions:</label>
                  <div v-for="permission in storeUtils.permissions" :key="permission.id" class="permission-item">
                    <input type="checkbox" :id="'permission-' + module.id + '-' + permission.id" :value="permission.id" v-model="formData.module_permissions[module.id]">
                    <label :for="'permission-' + module.id + '-' + permission.id">{{ permission.name }}</label>
                  </div>
                </div>
              </div>
            </div>
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

.modules-list {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-top: 1rem;
  text-align: left; /* Alinea el texto a la izquierda */
}

.module-item {
  margin-bottom: 10px;
  background-color: #f0f0f0; /* Color de fondo para los módulos */
  padding: 10px;
  border-radius: 4px;
}

.submodules-container {
  margin-top: 10px;
  border-left: 2px solid #ccc;
  padding-left: 10px;
}

.submodule-item {
  background-color: #e0e0e0; /* Color de fondo para los submódulos */
  margin-left: 10px;
  padding: 5px;
  border-radius: 4px;
}

.permission-item {
  margin-left: 20px;
  margin-top: 5px;
}

</style>