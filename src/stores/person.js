import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import APIService from '../services/APIService';

export const usePersonStore = defineStore('personStore', () => {
    const personsList = ref([]);

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

    return {
        personsList,
        getPersons,
        createPerson
    };
});