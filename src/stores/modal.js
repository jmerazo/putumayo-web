import {ref} from 'vue'
import {defineStore} from 'pinia'


export const useModalStore = defineStore('modal',()=>{

    const modalUserAdd = ref(false)
    const modalDependencieAdd = ref(false)
    const modalSubdependencieAdd = ref(false)
    const modalPersonAdd = ref(false)
    const modalRoleAdd = ref(false)
    const modalPermissionAdd = ref(false)
    const modalModuleAdd = ref(false)
    const modalSubmoduleAdd = ref(false)
    const modalGroupAdd = ref(false)
    const modalTypedocsAdd = ref(false)
    
    //modal user
    function handleClickModalUserAdd(){
        modalUserAdd.value = !modalUserAdd.value
    }

    function handleClickModalDependencieAdd(){
        modalDependencieAdd.value = !modalDependencieAdd.value
    }

    function handleClickModalPersonAdd(){
        modalPersonAdd.value = !modalPersonAdd.value
    }

    function handleClickModalSubdependencieAdd(){
        modalSubdependencieAdd.value = !modalSubdependencieAdd.value
    }

    function handleClickModalRoleAdd(){
        modalRoleAdd.value = !modalRoleAdd.value
    }

    function handleClickModalPermissionAdd(){
        modalPermissionAdd.value = !modalPermissionAdd.value
    }

    function handleClickModalModuleAdd(){
        modalModuleAdd.value = !modalModuleAdd.value
    }

    function handleClickModalSubmoduleAdd(){
        modalSubmoduleAdd.value = !modalSubmoduleAdd.value
    }

    function handleClickModalGroupAdd(){
        modalGroupAdd.value = !modalGroupAdd.value
    }

    function handleClickModalTypedocsAdd(){
        modalTypedocsAdd.value = !modalTypedocsAdd.value
    }

    return {
        modalUserAdd,
        handleClickModalUserAdd,
        modalDependencieAdd,
        handleClickModalDependencieAdd,
        modalPersonAdd,
        handleClickModalPersonAdd,
        modalSubdependencieAdd,
        handleClickModalSubdependencieAdd,
        modalRoleAdd,
        handleClickModalRoleAdd,
        modalPermissionAdd,
        handleClickModalPermissionAdd,
        modalModuleAdd,
        handleClickModalModuleAdd,
        modalSubmoduleAdd,
        handleClickModalSubmoduleAdd,
        modalGroupAdd,
        handleClickModalGroupAdd,
        modalTypedocsAdd,
        handleClickModalTypedocsAdd
    }
})