import { useAuth, type TipoUsuario } from "~/services/auth-context";

/**
 * COMPONENTE: UserProfile (Resumen para Navbar/Header)
 * Actualizado: Ahora consume el AuthContext global para mantener consistencia.
 */
export function UserProfile() {
    const { usuarioActual, logout } = useAuth();

    // Si no hay usuario logueado, no mostramos nada (o podrías mostrar botón Login)
    if (!usuarioActual) return null;

    // Mapeo de textos para mostrar en la interfaz pequeña
    const labelPorTipo: Record<TipoUsuario, string> = {
        admin: "Administrador",
        mayor: "Adulto Mayor",
        estudiante_duoc: "Estudiante Duoc",
        regular: "Cliente",
    };

    return (
        <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="user-summary" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: '1.2' }}>
                <span className="user-email" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {usuarioActual.email}
                </span>
                <span className="user-type" style={{ fontSize: '0.75rem', color: 'var(--first-color)', textTransform: 'uppercase', fontWeight: 600 }}>
                    {labelPorTipo[usuarioActual.tipoUsuario] || "Usuario"}
                </span>
            </div>

            <button
                type="button"
                className="btn-link"
                onClick={logout}
                style={{
                    fontSize: '0.85rem',
                    color: '#666',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none'
                }}
            >
                Salir
            </button>
        </div>
    );
}
