import api from '../api/api';

export default {
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ AUTHENTICATION
    // Obtiene el token -- http://localhost:8000/api/auth/token
    getLogin(credentials, authType){
        console.log(credentials, authType)
        return api.post('/auth/', { ...credentials, authType });
    },
    getUserData(){
        const token = localStorage.getItem('access_token')
        return api.post('/auth/permissions/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
}