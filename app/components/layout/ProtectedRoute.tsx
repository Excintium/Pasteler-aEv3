import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import { useAuth } from "~/services/auth-context";

/**
 * COMPONENTE: PROTECTED ROUTE
 * * Patrón: High-Order Component (HOC) / Wrapper para seguridad en cliente.
 * * Responsabilidad:
 * 1. Verificar el estado de autenticación global.
 * 2. Manejar estados de carga (evita parpadeos o redirecciones falsas).
 * 3. Redirigir a /login preservando la intención del usuario (returnUrl).
 */

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { usuarioActual, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Solo tomamos decisiones cuando terminó de cargar la sesión (isLoading === false)
        if (!isLoading && !usuarioActual) {
            // Redirigimos al login, pero recordamos dónde quería ir el usuario (state: from)
            navigate("/login", {
                replace: true,
                state: { from: location }
            });
        }
    }, [usuarioActual, isLoading, navigate, location]);

    // Muestra un spinner o nada mientras verificamos el token
    if (isLoading) {
        return <div className="loading-spinner">Cargando sesión...</div>;
    }

    // Si hay usuario, renderizamos el contenido protegido (ej: Perfil)
    return usuarioActual ? <>{children}</> : null;
}