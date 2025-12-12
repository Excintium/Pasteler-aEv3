import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { api } from "./api";
import type { AxiosError } from "axios";

export type TipoUsuario = "admin" | "mayor" | "estudiante_duoc" | "regular";

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    rol: string;
    tipoUsuario: TipoUsuario;
    fechaNacimiento?: string;
}

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
    isLoading: boolean;
    error: string | null;
}

interface AuthContextValue extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (data: { nombre: string; email: string; password: string; fechaNacimiento?: string; rol?: string }) => Promise<void>;
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

    // Lógica de Negocio: Inferencia de Roles
    const inferirTipoUsuario = (email: string, rol: string, fechaNacimiento?: string): TipoUsuario => {
        if (rol === 'admin' || rol === 'ADMIN') return "admin";
        if (email.toLowerCase().endsWith("@duoc.cl")) return "estudiante_duoc";
        if (fechaNacimiento) {
            const cumple = new Date(fechaNacimiento);
            const hoy = new Date();
            let edad = hoy.getFullYear() - cumple.getFullYear();
            const m = hoy.getMonth() - cumple.getMonth();
            if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
                edad--;
            }
            if (edad >= 60) return "mayor";
        }
        return "regular";
    };

    // Restaurar sesión al inicio
    useEffect(() => {
        const restaurarSesion = () => {
            const token = localStorage.getItem(STORAGE_KEY_TOKEN);
            const userRaw = localStorage.getItem(STORAGE_KEY_USER);

            if (token && userRaw) {
                try {
                    const userParsed = JSON.parse(userRaw);
                    setState({
                        usuarioActual: userParsed,
                        isLoading: false, // La sesión está lista
                        error: null
                    });
                } catch (e) {
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
            const { data } = await api.post<LoginResponse>("/auth/login", { email, password });

            const tipoCalculado = inferirTipoUsuario(data.user.email, data.user.rol, data.user.fechaNacimiento);
            const usuarioAdaptado: Usuario = {
                id: data.user.id,
                nombre: data.user.name,
                email: data.user.email,
                rol: data.user.rol,
                fechaNacimiento: data.user.fechaNacimiento,
                tipoUsuario: tipoCalculado
            };

            localStorage.setItem(STORAGE_KEY_TOKEN, data.access_token);
            localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(usuarioAdaptado));

            setState({
                usuarioActual: usuarioAdaptado,
                isLoading: false,
                error: null
            });
        } catch (err) {
            const errorAxios = err as AxiosError<{ message: string }>;
            const mensajeError = errorAxios.response?.data?.message || "Error de credenciales";
            setState(prev => ({ ...prev, isLoading: false, error: mensajeError }));
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY_TOKEN);
        localStorage.removeItem(STORAGE_KEY_USER);
        setState({ usuarioActual: null, isLoading: false, error: null });
    };

    /**
     * REGISTER: Versión Corregida y Blindada
     * Evita cerrar la sesión del admin al crear usuarios.
     */
    const register = async (registerData: { nombre: string; email: string; password: string; fechaNacimiento?: string; rol?: string }) => {
        const esAdminCreandoUsuario = !!state.usuarioActual; // ¿Hay alguien logueado?

        // Si NO hay usuario (registro público), mostramos loading global.
        // Si ES admin, NO tocamos el loading global para no parpadear la interfaz.
        if (!esAdminCreandoUsuario) {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
        }

        try {
            await api.post("/auth/register", {
                name: registerData.nombre,
                email: registerData.email,
                password: registerData.password,
                fechaNacimiento: registerData.fechaNacimiento,
                rol: registerData.rol
            });

            // Solo hacemos auto-login si es un usuario nuevo registrándose él mismo.
            if (!esAdminCreandoUsuario) {
                await login(registerData.email, registerData.password);
            }
            // Si es admin, no hacemos nada más (el componente mostrará el mensaje de éxito).

        } catch (err) {
            const errorAxios = err as AxiosError<{ message: string }>;
            const msg = errorAxios.response?.data?.message || "Error al registrar usuario";

            // Solo actualizamos el error global si no es admin (para el form de login público)
            if (!esAdminCreandoUsuario) {
                setState(prev => ({ ...prev, isLoading: false, error: msg }));
            }
            throw new Error(msg); // Relanzamos para que el formulario local lo capture
        }
    };

    const obtenerBeneficioUsuario = (user?: Usuario | null) => {
        const u = user ?? state.usuarioActual;
        if (!u) return null;
        switch (u.tipoUsuario) {
            case "admin": return "Administrador · Acceso Total";
            case "mayor": return "Usuario Mayor · 50% Descuento";
            case "estudiante_duoc": return "Estudiante Duoc · Torta Gratis";
            default: return "Cliente Regular · Acumula Puntos";
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout, register, obtenerBeneficioUsuario }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return ctx;
}
