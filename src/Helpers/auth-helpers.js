import Axios from "axios";


const TOKEN_KEY = 'CRC_TOKEN';


/**
 * Guardar el Token
 * @param token
 */
export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Leer el token
 */
export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Eliminar el Token
 */

export function deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem("TOKEN_KEY");
    sessionStorage.clear();
}


/**
 * Interceptar las llamadas en las peticiones
 * si existe un token se  agrega  en el http autorizacion
 * para que el servidor pueda reconocer el usuario
 */

export function initAxiosInterceptors() {
    Axios.interceptors.request.use(function (config) {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `${token}`;
            // config.headers.Authorization = `bearer ${token}`;
        }
        return config;
    });

    Axios.interceptors.response.use(
        function (response) {
            return response;

        },
        function (error) {
            if (error.response.status === 401) {
                deleteToken();
                window.location = '/';
            } else {
                return Promise.reject(error);
            }
        }
    )


}






