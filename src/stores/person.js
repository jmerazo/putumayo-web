import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import APIService from '../services/APIService';
import { useModalStore } from "@/stores/modal";

const modal = useModalStore();

export const usePersonStore = defineStore('personStore', () => {
    const personsList = ref([]);
    const personSelected = ref('')

    const router = useRouter();

    const getPersons = async () => {
      try {
        const response = await APIService.getPersons();
        if (response.status === 200) {
            personsList.value = response.data;
        } else {
          return { success: false };
        }
      } catch (error) {
        console.error('Error person list: ', error);
        return { success: false, error };
      }
    }

    const createPerson = async(data) => {
        const response = await APIService.createPerson(data)
        console.log('response : ', response)
        if(response.status === 201){
          personsList.value.push(data); // Agrega el nuevo objeto al array
          window.location.reload();
        }else{
            console.log('status create: ', response.status)
            throw new Error(`Error creating person: ${response.statusText}`);
        }
    }

    function selectedPersonUpdate(id) {
      personSelected.value =  personsList.value.filter(person => person.id === id)
      modal.handleClickModalPersonUpdate(personSelected.value); 
    }

    const personUpdate = async (id, data) => {
      const personIndex = personsList.value.findIndex((p) => p.id === id);
      if (personIndex !== -1) {
          Object.assign(personsList.value[personIndex], data);
          await APIService.updatePerson(id, data)
      } else {
          console.error(`Person con ID ${id} no encontrada.`);
      }
    };

    async function deletePerson(pk) {
      const indexToDelete = personsList.value.findIndex(item => item.id === pk);
    
      if (indexToDelete === -1) {
        return { msg: "User not found" };
      }

      try {
        await APIService.deletePerson(pk); // Realiza la solicitud DELETE al backend
        personsList.value.splice(indexToDelete, 1); // Elimina al usuario de la lista local
        return { msg: "User deleted successfully" };
      } catch (error) {
        return { msg: "Error deleting user", details: error.response || error.message || error };
      }
    }

    return {
        personsList,
        getPersons,
        createPerson,
        deletePerson,
        selectedPersonUpdate,
        personSelected,
        personUpdate
    };
});