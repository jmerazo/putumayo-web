<script setup>
import { ref, computed, watch } from 'vue';
import { useUserStore } from "@/stores/users";
import { useModalStore } from "@/stores/modal";
import { useUtilsStore } from "@/stores/utils";

const storeUser = useUserStore();
const modal = useModalStore();
const storeUtils = useUtilsStore();
const error = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordMatch = ref(true);

const formData = ref({
  password: '',
  confirm_password: '',
  a_rol: '',
  a_group: '',
  p_doc_type: '',
  doc_number: '',
  first_name: '',
  last_name: '',
  email: '',
  cellphone: '',
  address: '',
  p_department: '',
  p_city: '',
  picture: '',
  is_active: 1,
  ump_module: [],
  dependencie: '',
  subdependencie: '',
  module_permissions: {},
  submodule_permissions: {},
  selected_submodules: {}
});

console.log('formData inicializado:', formData.value); 

const submodulesInit = ref([]);

watch(() => formData.value.confirm_password, () => {
  if (formData.value.confirm_password !== '') {
    passwordMatchClass.value;
  }
});

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

function validateFields(obj) {
  return Object.values(obj).some((value) => value === "");
}

async function userCreate() {
  if (validateFields(formData.value)) {
    showError("Complete all fields");
    return;
  }

  console.log('data save user: ', formData.value)

  try {
    const response = await storeUser.createUser(formData.value);
    if(response.status === 201){
      resetForm();
      modal.handleClickModalUserAdd()
    }    
  } catch (error) {
    console.log('error modal: ', error)
    if (error.response && error.response.data && error.response.data.error) {
      alert(error.response.data.error);
    } else {
      alert("Ocurrió un error al procesar la solicitud.");
    }
  }
}

const filteredCities = computed(() => {
  const { p_department } = formData.value;

  if (p_department) {
    const selectedDepartment = storeUtils.departments.find(
      (department) => department.id === p_department
    );

    if (selectedDepartment) {
      const filtered = storeUtils.cities.filter(
        (city) => city.department_id === selectedDepartment.code
      );
      return filtered;
    }
  }
  return [];
});

const showError = (message) => {
  error.value = message;
  setTimeout(() => {
    error.value = null;
  }, 3000);
};

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

function toggleShowConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

const filteredSubs = computed(() => {
  const { dependencie } = formData.value;
  console.log('dep: ', dependencie)

  if (dependencie) {
    const filtered = storeUtils.subdependencies.filter(
      (sub) => sub.dependencie.id === dependencie
    );
    return filtered;
  }
  return [];
});

function checkPasswordMatch() {
  passwordMatch.value = formData.value.password === formData.value.confirm_password;
}

const passwordMatchClass = computed(() => {
  if (formData.value.confirm_password === '') {
    return 'underline-neutral';
  }
  return passwordMatch.value ? 'underline-match' : 'underline-mismatch';
});

function getModuleName(moduleId) {
  const module = storeUtils.modules.find(m => m.id === moduleId);
  return module ? module.name : 'Unknown Module';
}

// Función para obtener submódulos por módulo
function getSubmodulesByModule(moduleId) {
  return storeUtils.submodules.filter(submodule => submodule.sm_module.id === moduleId);
}

// Función para alternar la selección de módulos
function toggleModuleSelection(event, moduleId) {
  event.preventDefault();
  const index = formData.value.ump_module.indexOf(moduleId);

  if (index > -1) {
    // Deseleccionar módulo
    formData.value.ump_module.splice(index, 1);
    delete formData.value.module_permissions[moduleId];
    delete formData.value.selected_submodules[moduleId];
    delete formData.value.submodule_permissions[moduleId];
  } else {
    // Seleccionar módulo
    formData.value.ump_module.push(moduleId);
    formData.value.module_permissions[moduleId] = [];
    formData.value.selected_submodules[moduleId] = getSubmodulesByModule(moduleId);
    formData.value.submodule_permissions[moduleId] = {};
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

// Función para alternar la selección de submódulos
function toggleSubmoduleSelection(event, moduleId, submoduleId) {
  event.preventDefault();
  const submodules = formData.value.selected_submodules[moduleId];
  const index = submodules.indexOf(submoduleId);

  if (index > -1) {
    // Deseleccionar submódulo
    submodules.splice(index, 1);
    delete formData.value.submodule_permissions[moduleId][submoduleId];
  } else {
    // Seleccionar submódulo
    submodules.push(submoduleId);
    if (!formData.value.submodule_permissions[moduleId][submoduleId]) {
      formData.value.submodule_permissions[moduleId][submoduleId] = [];
    }
  }
}

// Función para alternar la selección de permisos de submódulos
function toggleSubmodulePermission(moduleId, submoduleId, permissionId) {
  const permissions = formData.value.submodule_permissions[moduleId][submoduleId];
  const index = permissions.indexOf(permissionId);
  if (index > -1) {
    permissions.splice(index, 1);
  } else {
    permissions.push(permissionId);
  }
}

function getSubmoduleName(submoduleId) {
  // Convertir submoduleId a un número antes de buscar
  const idToSearch = Number(submoduleId);
  const submodule = storeUtils.submodules.find(s => s.id === idToSearch);
  return submodule ? submodule.name : 'Unknown Submodule';
}
</script>

<template>
  <div class="modal" v-if="modal.modalUserAdd">
    <div class="modal__contenido">
      <div class="form__modal--content">
        <div class="header">
          <button type="button" class="btn__closew" @click="modal.handleClickModalUserAdd(), resetForm()">
            <img src="/icons/icon_close_line.svg" alt="Close windows" class="btn__icon__closew">
          </button>
        </div>

        <h3 class="form__modal--title">User Add</h3>
        <hr>
        <form class="form__modal" @submit.prevent="userCreate">
          <div class="form__modal--field">
            <label class="form__modal--label" for="usuario">Document Type: </label>
            <select id="p_doc_type" class="form__modal--input" v-model="formData.p_doc_type">
              <option value="" disabled selected>Select document type...</option>
              <option v-for="td in storeUtils.typedocs" :key="td.id" :value="td.id">
                {{ td.name }}
              </option>
            </select>
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Document Number: </label>
            <input class="form__modal--input" type="number" v-model="formData.doc_number" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">First name: </label>
            <input class="form__modal--input" type="text" v-model="formData.first_name" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Last name: </label>
            <input class="form__modal--input" type="text" v-model="formData.last_name" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Email: </label>
            <input class="form__modal--input" type="text" v-model="formData.email" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Password: </label>
            <div class="password-container">
              <input class="form__modal--input" :type="showPassword ? 'text' : 'password'" v-model="formData.password" />
              <button type="button" class="btn__toggle" @click="toggleShowPassword">
                <img :src="showPassword ? '/icons/icon_eye_off.svg' : '/icons/icon_eye.svg'" class="btn__icon__toggle" />
              </button>
            </div>
            <div :class="passwordMatchClass"></div>
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Confirm Password: </label>
            <div class="password-container">
              <input class="form__modal--input" :type="showConfirmPassword ? 'text' : 'password'" v-model="formData.confirm_password" @input="checkPasswordMatch" />
              <button type="button" class="btn__toggle" @click="toggleShowConfirmPassword">
                <img :src="showConfirmPassword ? '/icons/icon_eye_off.svg' : '/icons/icon_eye.svg'" class="btn__icon__toggle" />
              </button>
            </div>
            <div :class="passwordMatchClass"></div>
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Cellphone: </label>
            <input class="form__modal--input" type="text" v-model="formData.cellphone" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Address: </label>
            <input class="form__modal--input" type="text" v-model="formData.address" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label" for="department">Department:</label>
            <select id="department" class="form__modal--input" v-model="formData.p_department">
              <option value="" selected disabled>Select department...</option>
              <option v-for="d in storeUtils.departments" :key="d.id" :value="d.id">
                {{ d.name }}
              </option>
            </select>
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label" for="city" v-show="filteredCities.length">City:</label>
            <select id="city" class="form__modal--input" v-model="formData.p_city"
              v-show="filteredCities.length">
              <option value="" disabled selected>Select city...</option>
              <option v-for="city in filteredCities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label" for="picture">Picture:</label>
            <input class="form__modal--input" type="text" v-model="formData.picture">
          </div>

          <hr>

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
            <select id="dependencie" class="form__modal--input" v-model="formData.dependencie">
              <option value="" selected disabled>Select dependencie...</option>
              <option v-for="d in storeUtils.dependencies" :key="d.id" :value="d.id">
                {{ d.name }}
              </option>
            </select>
          </div>

          <div class="form__modal--field" v-show="filteredSubs.length">
            <label class="form__modal--label" for="subdependencie">Subdependencie:</label>
            <select id="subdependencie" class="form__modal--input" v-model="formData.subdependencie">
              <option value="" disabled selected>Select subdependencie...</option>
              <option v-for="s in filteredSubs" :key="s.id" :value="s.id">
                {{ s.name }}
              </option>
            </select>
          </div>

          <hr>

          <div class="form__modal--field">
            <label class="form__modal--label" for="ump_module">Modules:</label>
            <select id="ump_module" class="form__modal--input" multiple>
              <option value="" disabled>Select modules...</option>
              <option
                v-for="m in storeUtils.modules"
                :key="m.id"
                :value="m.id"
                :class="{ selected: formData.ump_module.includes(m.id) }"
                @click="toggleModuleSelection($event, m.id)"
              >
                {{ m.name }}
              </option>
            </select>
          </div>

          <div v-for="moduleId in formData.ump_module" :key="moduleId" class="module-permissions">
            <h4>{{ getModuleName(moduleId) }}</h4>
            <div class="form__modal--field">
              <label class="form__modal--label" for="ump_permission">Permissions:</label>
              <select id="ump_permission" class="form__modal--input" multiple>
                <option value="" disabled>Select permissions...</option>
                <option
                  v-for="p in storeUtils.permissions"
                  :key="p.id"
                  :value="p.id"
                  :class="{ selected: (formData.module_permissions[moduleId] || []).includes(p.id) }"
                  @click.prevent="togglePermission(moduleId, p.id)"
                >
                  {{ p.name }}
                </option>
              </select>
            </div>

            <div v-if="formData.selected_submodules[moduleId] && formData.selected_submodules[moduleId].length > 0">
              <h5>Submodules</h5>
              <div class="form__modal--field">
                <label class="form__modal--label" for="ump_submodule">Submodules:</label>
                <select id="ump_submodule" class="form__modal--input" multiple>
                  <option value="" disabled>Select submodules...</option>
                  <option
                    v-for="s in getSubmodulesByModule(moduleId)"
                    :key="s.id"
                    :value="s.id"
                    :class="{ selected: formData.selected_submodules[moduleId] && formData.selected_submodules[moduleId].includes(s.id) }"
                    @click.prevent="toggleSubmoduleSelection($event, moduleId, s.id)"
                  >
                    {{ s.name }}
                  </option>
                </select>
              </div>

              <div v-for="(subPermissions, submoduleId) in (formData.submodule_permissions[moduleId] || {})" :key="submoduleId" class="submodule-permissions">
                <h5>{{ getSubmoduleName(submoduleId) }}</h5>
                <div class="form__modal--field">
                  <label class="form__modal--label" for="ump_subpermission">Submodule Permissions:</label>
                  <select id="ump_subpermission" class="form__modal--input" multiple>
                    <option value="" disabled>Select permissions...</option>
                    <option
                      v-for="p in storeUtils.permissions"
                      :key="p.id"
                      :value="p.id"
                      :class="{ selected: subPermissions.includes(p.id) }"
                      @click.prevent="toggleSubmodulePermission(moduleId, submoduleId, p.id)"
                    >
                      {{ p.name }}
                    </option>
                  </select>
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
</style>