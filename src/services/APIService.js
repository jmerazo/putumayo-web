import api from '../api/api';

export default {
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ AUTHENTICATION
    // Obtiene el token -- http://localhost:8000/api/auth/token
    getLogin(credentials, authType){
        return api.post('/auth/token/access/', { ...credentials, authType });
    },
    getUserData(id) {
        return api.get(`/auth/permissions/${id}`)
    },
    refreshAuthToken(refreshToken){
        return api.post('/auth/token/refresh/', refreshToken)
    },
    getUsers(){
        return api.get(`/auth/users/`)
    },
    createUser(data){
        return api.post(`/auth/register/`, data)
    },
    updateUser(pk, data){
        return api.put(`/auth/permissions/${pk}`, data)
    },
    updatePasswordUser(pk, newPassword){
        return api.put(`/auth/password/${pk}`, newPassword)
    },
    deleteUser(pk){
        return api.delete(`/auth/users/${pk}`)
    },
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ UTILS
    // Obtiene los datos de departamento y municipios -- http://localhost:8000/api/utils/departments
    getDepartments(){
        return api.get(`/utils/departments/`)
    },
    getCities(){
        return api.get(`/utils/cities/`)
    },
    getTypeDocuments(){
        return api.get(`/utils/typedocs/`)
    },
    createTypeDocuments(data){
        return api.post(`/utils/typedocs/`, data)
    },
    updateTypeDocument(id, data){
        return api.put(`/utils/typedocs/${id}`, data)
    },
    deleteTypeDocument(id){
        return api.delete(`/utils/typedocs/${id}`)
    },
    /* ============================================== */
    getRoles(){
        return api.get(`/utils/roles/`)
    },
    createRoles(data){
        return api.post(`/utils/roles/`, data)
    },
    updateRol(id, data){
        return api.put(`/utils/roles/${id}`, data)
    },
    deleteRol(id){
        return api.delete(`/utils/roles/${id}`)
    },
    /* =============================================== */
    getGroups(){
        return api.get(`/utils/groups/`)
    },
    createGroups(data){
        return api.post(`/utils/groups/`, data)
    },
    updateGroup(id, data){
        return api.put(`/utils/groups/${id}`, data)
    },
    deleteGroup(id){
        return api.delete(`/utils/groups/${id}`)
    },
    /* =============================================== */
    getModules(){
        return api.get(`/utils/modules/`)
    },
    createModules(data){
        return api.post(`/utils/modules/`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        })
    },
    updateModule(id, data){
        return api.put(`/utils/modules/${id}`, data)
    },
    deleteModule(id){
        return api.delete(`/utils/modules/${id}`)
    },
    /* =============================================== */
    getSubmodules(){
        return api.get(`/utils/submodules/`)
    },
    createSubmodules(data){
        return api.post(`/utils/submodules/`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        })
    },
    updateSubmodule(id, data){
        return api.put(`/utils/submodules/${id}`, data)
    },
    deleteSubmodule(id){
        return api.delete(`/utils/submodules/${id}`)
    },
    /* =============================================== */
    getPermissions(){
        return api.get(`/utils/permissions/`)
    },
    createPermissions(data){
        return api.post(`/utils/permissions/`, data)
    },
    updatePermission(id, data){
        return api.put(`/utils/permissions/${id}`, data)
    },
    deletePermission(id){
        return api.delete(`/utils/permissions/${id}`)
    },
    /* =============================================== */
    getDependencies(){
        return api.get(`/utils/dependencies/`)
    },
    createDependencies(data){
        return api.post(`/utils/dependencies/`, data)
    },
    updateDependencies(id, data){
        return api.put(`/utils/dependencies/${id}`, data)
    },
    deleteDependencies(id){
        return api.delete(`/utils/dependencies/${id}`)
    },
    /* =============================================== */
    getSubdependencies(){
        return api.get(`/utils/subdependencies/`)
    },
    createSubdependencies(data){
        return api.post(`/utils/subdependencies/`, data)
    },
    updateSubdependencies(id, data){
        return api.put(`/utils/subdependencies/${id}`, data)
    },
    deleteSubdependencies(id){
        return api.delete(`/utils/subdependencies/${id}`)
    },
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ PERSON
    // Obtiene los datos de departamento y municipios -- http://localhost:8000/api/person/
    getPersons(){
        return api.get(`/person/`)
    },
    createPerson(data){
        return api.post(`/person/`, data)
    },
    updatePerson(id, data){
        return api.put(`/person/${id}`, data)
    },
    deletePerson(id){
        return api.delete(`/person/${id}`)
    },
}