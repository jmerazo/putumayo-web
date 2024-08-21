import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import APIService from "../services/APIService";
import { useModalStore } from "@/stores/modal";

const modal = useModalStore();

export const useUtilsStore = defineStore("utilsStore", () => {
  const departments = ref([]);
  const cities = ref({});
  const typedocs = ref([]);
  const typedocSelected = ref('');
  const roles = ref([]);
  const rolSelected = ref('');
  const groups = ref([]);
  const groupSelected = ref('');
  const modules = ref([]);
  const moduleSelected = ref('');
  const submodules = ref([]);
  const submoduleSelected = ref('');
  const permissions = ref([]);
  const permissionSelected = ref('');
  const dependencies = ref([]);
  const dependencieSelected = ref('');
  const subdependencies = ref([]);
  const subdependencieSelected = ref('');

  onMounted(async () => {
    try {
      const departmentsResponse = await APIService.getDepartments();
      departments.value = departmentsResponse.data;

      const citiesResponse = await APIService.getCities();
      cities.value = citiesResponse.data;

      const typedocsResponse = await APIService.getTypeDocuments();
      typedocs.value = typedocsResponse.data;

      const rolesResponse = await APIService.getRoles();
      roles.value = rolesResponse.data;

      const groupssResponse = await APIService.getGroups();
      groups.value = groupssResponse.data;

      const modulesResponse = await APIService.getModules();
      modules.value = modulesResponse.data;

      const submodulesResponse = await APIService.getSubmodules();
      submodules.value = submodulesResponse.data;

      const permissionsResponse = await APIService.getPermissions();
      permissions.value = permissionsResponse.data;

      const dependenciesResponse = await APIService.getDependencies();
      dependencies.value = dependenciesResponse.data;

      const subdependenciesResponse = await APIService.getSubdependencies();
      subdependencies.value = subdependenciesResponse.data;
    } catch (error) {
      console.error("Error al obtener datos: ", error);
    }
  });

  const createDependencie = async(data) => {
    try {
      const response = await APIService.createDependencies(data)
      if(response.status === 201){
        dependencies.value.push(data); // Agrega el nuevo objeto al array
        window.location.reload();
      }else{
        console.log('status: ', response.status)
        throw new Error(`Error creating dependencie: ${response.statusText}`);
      }
    } catch (error) {
      console.log('error create dependencie: ', error)
      throw error;
    }
  }

  function selectedDependencie(id) {
    dependencieSelected.value =  dependencies.value.filter(dependencie => dependencie.id === id)
    modal.handleClickModalDependencieAdd(dependencieSelected.value); 
  }

  const dependencieUpdate = async (id, data) => {
    const dependencieIndex = dependencies.value.findIndex((d) => d.id === id);
    if (dependencieIndex !== -1) {
        Object.assign(dependencies.value[dependencieIndex], data);
        const response = await APIService.updateDependencies(id, data)
        return response
    } else {
        console.error(`Dependencie con ID ${id} no encontrada.`);
    }
  };

  async function deleteDependencie(pk) {
    const indexToDelete = dependencies.value.findIndex(item => item.id === pk);
  
    if (indexToDelete === -1) {
      return { msg: "Dependencie not found" };
    }

    try {
      await APIService.deleteDependencies(pk); // Realiza la solicitud DELETE al backend
      dependencies.value.splice(indexToDelete, 1); // Elimina al usuario de la lista local
      return { msg: "Dependencie deleted successfully" };
    } catch (error) {
      console.error('Error deleting dependencie:', error.response || error.message || error);
      return { msg: "Error deleting dependencie", details: error.response || error.message || error };
    }
  }

  const createSubdependencie = async(data) => {
    try {
      const response = await APIService.createSubdependencies(data)
      if(response.status === 201){
        subdependencies.value.push(data); // Agrega el nuevo objeto al array
        window.location.reload();
      }else{
        console.log('status: ', response.status)
        throw new Error(`Error creating subdependencie: ${response.statusText}`);
      }
    } catch (error) {
      console.log('error create subdependencie: ', error)
      throw error;
    }
  }

  function selectedSubdependencie(id) {
    subdependencieSelected.value =  subdependencies.value.filter(subdependencie => subdependencie.id === id)
    modal.handleClickModalSubdependencieUpdate(subdependencieSelected.value); 
  }

  const subdependencieUpdate = async (id, data) => {
    const subdependencieIndex = subdependencies.value.findIndex((d) => d.id === id);
    if (subdependencieIndex !== -1) {
        Object.assign(subdependencies.value[subdependencieIndex], data);
        const response = await APIService.updateSubdependencies(id, data)
        return response
    } else {
        console.error(`Subdependencie con ID ${id} no encontrada.`);
    }
  };

  async function deleteSubdependencie(pk) {
    const indexToDelete = subdependencies.value.findIndex(item => item.id === pk);
  
    if (indexToDelete === -1) {
      return { msg: "Subdependencie not found" };
    }

    try {
      await APIService.deleteSubdependencies(pk); // Realiza la solicitud DELETE al backend
      subdependencies.value.splice(indexToDelete, 1); // Elimina al usuario de la lista local
      return { msg: "Subdependencie deleted successfully" };
    } catch (error) {
      console.error('Error deleting subdependencie:', error.response || error.message || error);
      return { msg: "Error deleting subdependencie", details: error.response || error.message || error };
    }
  }

  const createRole = async(data) => {
    try {
      const response = await APIService.createRoles(data)
      if(response.status === 201){
        roles.value.push(data); // Agrega el nuevo objeto al array
        window.location.reload();
      }else{
        console.log('status: ', response.status)
        throw new Error(`Error creating role: ${response.statusText}`);
      }
    } catch (error) {
      console.log('error create role: ', error)
      throw error;
    }
  }

  function selectedRol(id) {
    rolSelected.value =  roles.value.filter(rol => rol.id === id)
    modal.handleClickModalRolUpdate(rolSelected.value); 
  }

  const rolUpdate = async (id, data) => {
    const rolIndex = roles.value.findIndex((r) => r.id === id);
    if (rolIndex !== -1) {
        Object.assign(roles.value[rolIndex], data);
        const response = await APIService.updateRol(id, data)
        return response
    } else {
        console.error(`Subdependencie con ID ${id} no encontrada.`);
    }
  };

  async function deleteRol(pk) {
    const indexToDelete = roles.value.findIndex(item => item.id === pk);
  
    if (indexToDelete === -1) {
      return { msg: "Role not found" };
    }

    try {
      await APIService.deleteRol(pk); // Realiza la solicitud DELETE al backend
      roles.value.splice(indexToDelete, 1); // Elimina al usuario de la lista local
      return { msg: "Role deleted successfully" };
    } catch (error) {
      console.error('Error deleting role:', error.response || error.message || error);
      return { msg: "Error deleting role", details: error.response || error.message || error };
    }
  }

  const createPermission = async(data) => {
    try {
      const response = await APIService.createPermissions(data)
      if(response.status === 201){
        permissions.value.push(data); // Agrega el nuevo objeto al array
        window.location.reload();
      }else{
        console.log('status: ', response.status)
        throw new Error(`Error creating permission: ${response.statusText}`);
      }
    } catch (error) {
      console.log('error create permission: ', error)
      throw error;
    }
  }

  function selectedPermission(id) {
    permissionSelected.value =  permissions.value.filter(permission => permission.id === id)
    modal.handleClickModalPermissionUpdate(permissionSelected.value); 
  }

  const permissionUpdate = async (id, data) => {
    const permissionIndex = permissions.value.findIndex((p) => p.id === id);
    if (permissionIndex !== -1) {
        Object.assign(permissions.value[permissionIndex], data);
        const response = await APIService.updatePermission(id, data)
        return response
    } else {
        console.error(`Permission con ID ${id} no encontrada.`);
    }
  };

  async function deletePermission(pk) {
    const indexToDelete = permissions.value.findIndex(item => item.id === pk);
  
    if (indexToDelete === -1) {
      return { msg: "Permission not found" };
    }

    try {
      await APIService.deletePermission(pk); // Realiza la solicitud DELETE al backend
      permissions.value.splice(indexToDelete, 1); // Elimina al usuario de la lista local
      return { msg: "Permission deleted successfully" };
    } catch (error) {
      console.error('Error deleting permission:', error.response || error.message || error);
      return { msg: "Error deleting permission", details: error.response || error.message || error };
    }
  }

  const createModule = async(data) => {
    try {
      const response = await APIService.createModules(data)
      console.log('response: ', response)
      if(response.status === 201){
        modules.value.push(data); // Agrega el nuevo objeto al array
        window.location.reload();
      }else{
        console.log('status: ', response.status)
        throw new Error(`Error creating module: ${response.statusText}`);
      }
    } catch (error) {
      console.log('error create module: ', error)
      throw error;
    }
  }

  function selectedModule(id) {
    moduleSelected.value =  modules.value.filter(module => module.id === id)
    modal.handleClickModalModuleUpdate(moduleSelected.value); 
  }

  const moduleUpdate = async (id, data) => {
    const moduleIndex = modules.value.findIndex((m) => m.id === id);
    if (moduleIndex !== -1) {
        Object.assign(modules.value[moduleIndex], data);
        const response = await APIService.updateModule(id, data)
        return response
    } else {
        console.error(`Module ${id} not found.`);
    }
  };

  async function deleteModule(pk) {
    const indexToDelete = modules.value.findIndex(item => item.id === pk);
  
    if (indexToDelete === -1) {
      return { msg: "Module not found" };
    }

    try {
      await APIService.deleteModule(pk); // Realiza la solicitud DELETE al backend
      modules.value.splice(indexToDelete, 1); // Elimina al usuario de la lista local
      return { msg: "Module deleted successfully" };
    } catch (error) {
      console.error('Error deleting module:', error.response || error.message || error);
      return { msg: "Error deleting module", details: error.response || error.message || error };
    }
  }

  const createSubmodule = async(data) => {
    try {
      const response = await APIService.createSubmodules(data)

      if(response.status === 201){
        submodules.value.push(data); // Agrega el nuevo objeto al array
        window.location.reload();
      }else{
        console.log('status: ', response.status)
        throw new Error(`Error creating submodule: ${response.statusText}`);
      }
    } catch (error) {
      console.log('error create submodule: ', error)
      throw error;
    }
  }

  function selectedSubmodule(id) {
    submoduleSelected.value =  submodules.value.filter(submodule => submodule.id === id)
    modal.handleClickModalSubmoduleUpdate(submoduleSelected.value); 
  }

  const submoduleUpdate = async (id, data) => {
    const submoduleIndex = submodules.value.findIndex((s) => s.id === id);
    if (submoduleIndex !== -1) {
        Object.assign(submodules.value[submoduleIndex], data);
        const response = await APIService.updateSubmodule(id, data)
        return response;
    } else {
        console.error(`Submodule ${id} not found.`);
    }
  };

  async function deleteSubmodule(pk) {
    const indexToDelete = submodules.value.findIndex(item => item.id === pk);
  
    if (indexToDelete === -1) {
      return { msg: "Submodule not found" };
    }

    try {
      await APIService.deleteSubmodule(pk); // Realiza la solicitud DELETE al backend
      submodules.value.splice(indexToDelete, 1); // Elimina al usuario de la lista local
      return { msg: "Submodule deleted successfully" };
    } catch (error) {
      console.error('Error deleting submodule:', error.response || error.message || error);
      return { msg: "Error deleting submodule", details: error.response || error.message || error };
    }
  }

  const createGroup = async(data) => {
    try {
      const response = await APIService.createGroups(data)

      if(response.status === 201){
        groups.value.push(data); // Agrega el nuevo objeto al array
        window.location.reload();
      }else{
        console.log('status: ', response.status)
        throw new Error(`Error creating submodule: ${response.statusText}`);
      }
    } catch (error) {
      console.log('error create submodule: ', error)
      throw error;
    }
  }

  function selectedGroup(id) {
    groupSelected.value =  groups.value.filter(group => group.id === id)
    modal.handleClickModalGroupUpdate(groupSelected.value); 
  }

  const groupUpdate = async (id, data) => {
    const groupIndex = groups.value.findIndex((g) => g.id === id);
    if (groupIndex !== -1) {
        Object.assign(groups.value[groupIndex], data);
        const response = await APIService.updateGroup(id, data)
        return response;
    } else {
        console.error(`Group ${id} not found.`);
    }
  };

  async function deleteGroup(pk) {
    const indexToDelete = groups.value.findIndex(item => item.id === pk);
  
    if (indexToDelete === -1) {
      return { msg: "Group not found" };
    }

    try {
      await APIService.deleteGroup(pk); // Realiza la solicitud DELETE al backend
      groups.value.splice(indexToDelete, 1); // Elimina al usuario de la lista local
      return { msg: "Group deleted successfully" };
    } catch (error) {
      console.error('Error deleting group:', error.response || error.message || error);
      return { msg: "Error deleting group", details: error.response || error.message || error };
    }
  }

  const createTypedocs = async(data) => {
    try {
      const response = await APIService.createTypeDocuments(data)

      if(response.status === 201){
        typedocs.value.push(data); // Agrega el nuevo objeto al array
        window.location.reload();
      }else{
        console.log('status: ', response.status)
        throw new Error(`Error creating type document: ${response.statusText}`);
      }
    } catch (error) {
      console.log('error create type document: ', error)
      throw error;
    }
  }

  function selectedTypedoc(id) {
    typedocSelected.value =  typedocs.value.filter(typedoc => typedoc.id === id)
    modal.handleClickModalTypedocsUpdate(typedocSelected.value); 
  }

  const typedocUpdate = async (id, data) => {
    const typedocIndex = typedocs.value.findIndex((td) => td.id === id);
    if (typedocIndex !== -1) {
        Object.assign(typedocs.value[typedocIndex], data);
        const response = await APIService.updateTypeDocument(id, data)
        return response;
    } else {
        console.error(`Type document ${id} not found.`);
    }
  };

  async function deleteTypeDocument(pk) {
    const indexToDelete = typedocs.value.findIndex(item => item.id === pk);
  
    if (indexToDelete === -1) {
      return { msg: "Type document not found" };
    }

    try {
      await APIService.deleteTypeDocument(pk); // Realiza la solicitud DELETE al backend
      typedocs.value.splice(indexToDelete, 1); // Elimina al usuario de la lista local
      return { msg: "Type document deleted successfully" };
    } catch (error) {
      console.error('Error deleting type document:', error.response || error.message || error);
      return { msg: "Error deleting type document", details: error.response || error.message || error };
    }
  }


  return {
    departments,
    cities,
    typedocs,
    roles,
    groups,
    modules,
    submodules,
    permissions,
    dependencies,
    subdependencies,
    createDependencie,
    createSubdependencie,
    createRole,
    createPermission,
    createModule,
    createSubmodule,
    createGroup,
    createTypedocs,
    deleteDependencie,
    deleteSubdependencie,
    deleteRol,
    deletePermission,
    deleteModule,
    deleteSubmodule,
    deleteGroup,
    deleteTypeDocument,
    dependencieSelected,
    selectedDependencie,
    dependencieUpdate,
    subdependencieSelected,
    selectedSubdependencie,
    subdependencieUpdate,
    rolSelected,
    selectedRol,
    rolUpdate,
    permissionSelected,
    selectedPermission,
    permissionUpdate,
    moduleSelected,
    selectedModule,
    moduleUpdate,
    submoduleSelected,
    selectedSubmodule,
    submoduleUpdate,
    groupSelected,
    selectedGroup,
    groupUpdate,
    typedocSelected,
    selectedTypedoc,
    typedocUpdate
  };
});
