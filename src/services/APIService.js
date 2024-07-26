import api from '../api/api';

export default {
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ AUTHENTICATION
    // Obtiene el token -- http://localhost:8000/api/auth/token
    getLogin(credentials, authType){
        return api.post('/auth/token/access/', { ...credentials, authType });
    },
    getUserData(id){
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
    updateTypeDocuments(id, data){
        return api.post(`/utils/typedocs/${id}`, data)
    },
    deleteTypeDocuments(id){
        return api.post(`/utils/typedocs/${id}`)
    },
    /* ============================================== */
    getRoles(){
        return api.get(`/utils/roles/`)
    },
    createRoles(data){
        return api.post(`/utils/roles/`, data)
    },
    updateRoles(id, data){
        return api.post(`/utils/roles/${id}`, data)
    },
    deleteRoles(id){
        return api.post(`/utils/roles/${id}`)
    },
    /* =============================================== */
    getGroups(){
        return api.get(`/utils/groups/`)
    },
    createGroups(data){
        return api.post(`/utils/groups/`, data)
    },
    updateGroups(id, data){
        return api.post(`/utils/groups/${id}`, data)
    },
    deleteGroups(id){
        return api.post(`/utils/groups/${id}`)
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
    updateModules(id, data){
        return api.post(`/utils/modules/${id}`, data)
    },
    deleteModules(id){
        return api.post(`/utils/modules/${id}`)
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
    updateSubmodules(id, data){
        return api.post(`/utils/submodules/${id}`, data)
    },
    deleteSubmodules(id){
        return api.post(`/utils/submodules/${id}`)
    },
    /* =============================================== */
    getPermissions(){
        return api.get(`/utils/permissions/`)
    },
    createPermissions(data){
        return api.post(`/utils/permissions/`, data)
    },
    updatePermissions(id, data){
        return api.post(`/utils/permissions/${id}`, data)
    },
    deletePermissions(id){
        return api.post(`/utils/permissions/${id}`)
    },
    /* =============================================== */
    getDependencies(){
        return api.get(`/utils/dependencies/`)
    },
    createDependencies(data){
        return api.post(`/utils/dependencies/`, data)
    },
    updateDependencies(id, data){
        return api.post(`/utils/dependencies/${id}`, data)
    },
    deleteDependencies(id){
        return api.post(`/utils/dependencies/${id}`)
    },
    getSubdependencies(){
        return api.get(`/utils/subdependencies/`)
    },
    createSubdependencies(data){
        return api.post(`/utils/subdependencies/`, data)
    },
    updateSubdependencies(id, data){
        return api.post(`/utils/subdependencies/${id}`, data)
    },
    deleteSubdependencies(id){
        return api.post(`/utils/subdependencies/${id}`)
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
        return api.post(`/person/${id}`, data)
    },
    deletePerson(id){
        return api.post(`/person/${id}`)
    },
}