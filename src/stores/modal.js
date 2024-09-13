import {ref} from 'vue'
import {defineStore} from 'pinia'


export const useModalStore = defineStore('modal',()=>{

    const modalUserAdd = ref(false)
    const modalUserUpdate = ref(false)
    const modalUserPassword = ref(false)
    const modalDependencieAdd = ref(false)
    const modalDependencieUpdate = ref(false)
    const modalSubdependencieAdd = ref(false)
    const modalSubdependencieUpdate = ref(false)
    const modalPersonAdd = ref(false)
    const modalRoleAdd = ref(false)
    const modalRolUpdate = ref(false)
    const modalPermissionAdd = ref(false)
    const modalPermissionUpdate = ref(false)
    const modalModuleAdd = ref(false)
    const modalModuleUpdate = ref(false)
    const modalSubmoduleAdd = ref(false)
    const modalGroupAdd = ref(false)
    const modalGroupUpdate = ref(false)
    const modalTypedocsAdd = ref(false)
    const modalTypedocsUpdate = ref(false)
    const modalPersonUpdate = ref(false)
    const modalSubmoduleUpdate = ref(false)
    const modalNewsAdd = ref(false)
    const modalNewsUpdate = ref(false)
    
    //modal user
    function handleClickModalUserAdd(){
        modalUserAdd.value = !modalUserAdd.value
    }

    function handleClickModalUserUpdate(){
        modalUserUpdate.value = !modalUserUpdate.value
    }

    function handleClickModalUserPassword(){
        modalUserPassword.value = !modalUserPassword.value
    }

    function handleClickModalDependencieAdd(){
        modalDependencieAdd.value = !modalDependencieAdd.value
    }

    function handleClickModalDependencieUpdate(){
        modalDependencieUpdate.value = !modalDependencieUpdate.value
    }

    function handleClickModalPersonAdd(){
        modalPersonAdd.value = !modalPersonAdd.value
    }

    function handleClickModalPersonUpdate(){
        modalPersonUpdate.value = !modalPersonUpdate.value
    }

    function handleClickModalSubdependencieAdd(){
        modalSubdependencieAdd.value = !modalSubdependencieAdd.value
    }

    function handleClickModalSubdependencieUpdate(){
        modalSubdependencieUpdate.value = !modalSubdependencieUpdate.value
    }

    function handleClickModalRoleAdd(){
        modalRoleAdd.value = !modalRoleAdd.value
    }

    function handleClickModalRolUpdate(){
        modalRolUpdate.value = !modalRolUpdate.value
    }

    function handleClickModalPermissionAdd(){
        modalPermissionAdd.value = !modalPermissionAdd.value
    }

    function handleClickModalPermissionUpdate(){
        modalPermissionUpdate.value = !modalPermissionUpdate.value
    }

    function handleClickModalModuleAdd(){
        modalModuleAdd.value = !modalModuleAdd.value
    }

    function handleClickModalModuleUpdate(){
        modalModuleUpdate.value = !modalModuleUpdate.value
    }

    function handleClickModalSubmoduleAdd(){
        modalSubmoduleAdd.value = !modalSubmoduleAdd.value
    }

    function handleClickModalSubmoduleUpdate(){
        modalSubmoduleUpdate.value = !modalSubmoduleUpdate.value
    }

    function handleClickModalGroupAdd(){
        modalGroupAdd.value = !modalGroupAdd.value
    }

    function handleClickModalGroupUpdate(){
        modalGroupUpdate.value = !modalGroupUpdate.value
    }

    function handleClickModalTypedocsAdd(){
        modalTypedocsAdd.value = !modalTypedocsAdd.value
    }

    function handleClickModalTypedocsUpdate(){
        modalTypedocsUpdate.value = !modalTypedocsUpdate.value
    }

    function handleClickModalNewsAdd(){
        modalNewsAdd.value = !modalNewsAdd.value
    }

    function handleClickModalNewsUpdate(){
        modalNewsUpdate.value = !modalNewsUpdate.value
    }

    return {
        modalUserAdd,
        handleClickModalUserAdd,
        modalUserUpdate,
        handleClickModalUserUpdate,
        modalDependencieAdd,
        handleClickModalDependencieAdd,
        modalDependencieUpdate,
        handleClickModalDependencieUpdate,
        modalPersonAdd,
        handleClickModalPersonAdd,
        modalSubdependencieAdd,
        handleClickModalSubdependencieAdd,
        modalSubdependencieUpdate,
        handleClickModalSubdependencieUpdate,
        modalRoleAdd,
        handleClickModalRoleAdd,
        modalPermissionAdd,
        handleClickModalPermissionAdd,
        modalPermissionUpdate,
        handleClickModalPermissionUpdate,
        modalModuleAdd,
        handleClickModalModuleAdd,
        modalSubmoduleAdd,
        handleClickModalSubmoduleAdd,
        modalGroupAdd,
        handleClickModalGroupAdd,
        modalTypedocsAdd,
        handleClickModalTypedocsAdd,
        modalPersonUpdate,
        handleClickModalPersonUpdate,
        modalRolUpdate,
        handleClickModalRolUpdate,
        modalModuleUpdate,
        handleClickModalModuleUpdate,
        modalSubmoduleUpdate,
        handleClickModalSubmoduleUpdate,
        modalGroupUpdate,
        handleClickModalGroupUpdate,
        modalTypedocsUpdate,
        handleClickModalTypedocsUpdate,
        modalUserPassword,
        handleClickModalUserPassword,
        modalNewsAdd,
        handleClickModalNewsAdd,
        modalNewsUpdate,
        handleClickModalNewsUpdate
    }
})