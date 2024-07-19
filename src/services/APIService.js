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
        return api.get(`/users/`)
    },
}