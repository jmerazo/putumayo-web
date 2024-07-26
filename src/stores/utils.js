import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import APIService from "../services/APIService";

export const useUtilsStore = defineStore("utilsStore", () => {
  const departments = ref([]);
  const cities = ref({});
  const typedocs = ref([]);
  const roles = ref([]);
  const groups = ref([]);
  const modules = ref([]);
  const submodules = ref([]);
  const permissions = ref([]);
  const dependencies = ref([]);
  const subdependencies = ref([]);

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
    createTypedocs
  };
});
