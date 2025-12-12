import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

/**
 * CONFIGURACIÓN DEL CLIENTE HTTP (AXIOS)
 * * Nivel de documentación: Senior
 * Patrón: Singleton para cliente HTTP con interceptores.
 * Objetivo: Abstraer la complejidad de autenticación y manejo de errores de los componentes UI.
 */

// URL base de tu Backend NestJS.
// Nota: '/api/v1' coincide con el 'setGlobalPrefix' que pusiste en tu main.ts del backend.
const API_URL = "http://localhost:3000/api/v1";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    // Timeout de 10s para evitar que la app se quede colgada si el server cae
    timeout: 10000,
});

/**
 * INTERCEPTOR DE REQUEST
 * Antes de que salga cualquier petición, este código se ejecuta.
 * Si existe un token en localStorage, lo inyecta en el header Authorization.
 */
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("jwt_access_token");

            if (token && config.headers) {
                // Formato estándar Bearer
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

/**
 * INTERCEPTOR DE RESPONSE
 * Analiza todas las respuestas que vuelven del backend.
 * Si detecta un error 401 (No autorizado), significa que el token venció o es falso.
 */
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401 && typeof window !== "undefined") {
            console.warn("[API] Sesión expirada o token inválido. Limpiando credenciales.");
            // Limpiamos el token local para obligar al usuario a loguearse de nuevo
            localStorage.removeItem("jwt_access_token");
            localStorage.removeItem("mil_sabores_user");

            // Opcional: Redirigir al login usando window.location
            // window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);