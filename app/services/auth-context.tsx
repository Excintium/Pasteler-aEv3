import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { api } from "./api";
import type { AxiosError } from "axios";

/**
 * DEFINICIÓN DE TIPOS
 * Mantenemos la estructura que tu UI ya espera para no romper el diseño.
 */
export type TipoUsuario = "mayor" | "estudiante_duoc" | "regular";

export interface Usuario {
    id: number;          // Backend usa number
    nombre: string;
    email: string;
    rol: string;         // Rol nativo del backend (ej: 'admin')
    tipoUsuario: TipoUsuario; // Rol calculado para beneficios del frontend
    fechaNacimiento?: string;
}

// Estructura exacta de lo que devuelve tu Backend en auth.service.ts
interface LoginResponse {
    access_token: string;
    user: {
        id: number;
        email: string;
        name: string;
        fechaNacimiento: string;
        rol: string;
    };
}

interface AuthState {
    usuarioActual: Usuario | null;
    isLoading: boolean; // Vital para mostrar spinners mientras carga
    error: string | null;
}

interface AuthContextValue extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (data: { nombre: string; email: string; password: string; fechaNacimiento?: string }) => Promise<void>;
    obtenerBeneficioUsuario: (user?: Usuario | null) => string | null;
}

const STORAGE_KEY_TOKEN = "jwt_access_token";
const STORAGE_KEY_USER = "mil_sabores_user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        usuarioActual: null,
        isLoading: true,
        error: null,
    });

    /**
     * Lógica de Negocio (Frontend)
     * Determina el beneficio basado en el email o fecha, igual que antes.
     */
    const inferirTipoUsuario = (email: string, fechaNacimiento?: string): TipoUsuario => {
        if (email.toLowerCase().endsWith("@duoc.cl")) return "estudiante_duoc";

        if (fechaNacimiento) {
            const cumple = new Date(fechaNacimiento);
            const hoy = new Date();
            let edad = hoy.getFullYear() - cumple.getFullYear();
            // Ajuste preciso de edad considerando mes y día
            const m = hoy.getMonth() - cumple.getMonth();
            if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
                edad--;
            }
            if (edad >= 60) return "mayor";
        }
        return "regular";
    };

    // Al cargar la app, verificamos si hay sesión guardada
    useEffect(() => {
        const restaurarSesion = () => {
            const token = localStorage.getItem(STORAGE_KEY_TOKEN);
            const userRaw = localStorage.getItem(STORAGE_KEY_USER);

            if (token && userRaw) {
                try {
                    const userParsed = JSON.parse(userRaw);
                    setState({
                        usuarioActual: userParsed,
                        isLoading: false,
                        error: null
                    });
                } catch (e) {
                    // Si el JSON está corrupto, limpiamos todo
                    logout();
                }
            } else {
                setState({ usuarioActual: null, isLoading: false, error: null });
            }
        };
        restaurarSesion();
    }, []);

    const login = async (email: string, password: string) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            // 1. LLAMADA REAL AL BACKEND
            const { data } = await api.post<LoginResponse>("/auth/login", {
                email,
                password
            });

            // 2. ADAPTACIÓN DE DATOS (Mapper)
            // Convertimos la respuesta del backend al formato que usa tu UI
            const tipoCalculado = inferirTipoUsuario(data.user.email, data.user.fechaNacimiento);

            const usuarioAdaptado: Usuario = {
                id: data.user.id,
                nombre: data.user.name, // Backend envía 'name', Frontend usa 'nombre'
                email: data.user.email,
                rol: data.user.rol,
                fechaNacimiento: data.user.fechaNacimiento,
                tipoUsuario: tipoCalculado
            };

            // 3. PERSISTENCIA
            localStorage.setItem(STORAGE_KEY_TOKEN, data.access_token);
            localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(usuarioAdaptado));

            setState({
                usuarioActual: usuarioAdaptado,
                isLoading: false,
                error: null
            });

        } catch (err) {
            const errorAxios = err as AxiosError<{ message: string }>;
            const mensajeError = errorAxios.response?.data?.message || "Error de conexión o credenciales inválidas";

            setState(prev => ({
                ...prev,
                isLoading: false,
                error: mensajeError
            }));
            throw err; // Re-lanzamos para que el formulario de Login pueda mostrar el error
        }
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY_TOKEN);
        localStorage.removeItem(STORAGE_KEY_USER);
        setState({ usuarioActual: null, isLoading: false, error: null });
    };

    const register = async (registerData: { nombre: string; email: string; password: string; fechaNacimiento?: string }) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            // El backend espera 'name', no 'nombre'
            await api.post("/auth/register", {
                name: registerData.nombre,
                email: registerData.email,
                password: registerData.password,
                fechaNacimiento: registerData.fechaNacimiento // Asegúrate de enviar formato YYYY-MM-DD
            });

            // Si el registro es exitoso, logueamos automáticamente
            await login(registerData.email, registerData.password);
        } catch (err) {
            const errorAxios = err as AxiosError<{ message: string }>;
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: errorAxios.response?.data?.message || "Error al registrar usuario"
            }));
            throw err;
        }
    };

    const obtenerBeneficioUsuario = (user?: Usuario | null) => {
        const u = user ?? state.usuarioActual;
        if (!u) return null;

        switch (u.tipoUsuario) {
            case "mayor":
                return "Usuario Mayor · 50% de descuento por edad";
            case "estudiante_duoc":
                return "Estudiante Duoc · Torta de cumpleaños gratis";
            case "regular":
                return "Usuario Regular · Descuentos con códigos y promociones";
            default:
                return null;
        }
    };

    return (
        <AuthContext.Provider
            value={{ ...state, login, logout, register, obtenerBeneficioUsuario }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return ctx;
}