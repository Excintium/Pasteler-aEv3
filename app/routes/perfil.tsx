import type { Route } from "./+types/perfil";
import { useAuth } from "~/services/auth-context";
import ProtectedRoute from "~/components/layout/ProtectedRoute";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Mi Perfil - Pastelería Mil Sabores" }];
}

export default function perfil() {
    // Consumimos el contexto real conectado al Backend
    const { usuarioActual, logout, obtenerBeneficioUsuario } = useAuth();

    // Obtenemos el texto del beneficio según la lógica de negocio
    const beneficioTexto = obtenerBeneficioUsuario();

    return (
        <ProtectedRoute>
            <section className="section active profile-section">
                <div className="container">
                    <div className="profile-header">
                        <h2 className="section-title">Mi Perfil</h2>
                        <p className="section-subtitle">Gestiona tus datos y preferencias</p>
                    </div>

                    <div className="profile-card">
                        <div className="profile-avatar">
                            {/* Generamos iniciales basadas en el nombre real */}
                            <span>{usuarioActual?.nombre.charAt(0).toUpperCase()}</span>
                        </div>

                        <div className="profile-info">
                            <h3>{usuarioActual?.nombre}</h3>
                            <p className="email">{usuarioActual?.email}</p>

                            <div className="user-badge">
                                {/* Mostramos el rol visualmente */}
                                <span className={`badge ${usuarioActual?.tipoUsuario}`}>
                                    {usuarioActual?.tipoUsuario === 'estudiante_duoc' ? 'Estudiante Duoc' :
                                        usuarioActual?.tipoUsuario === 'mayor' ? 'Adulto Mayor' : 'Cliente Regular'}
                                </span>
                            </div>
                        </div>

                        <div className="profile-benefit-box">
                            <h4>🎁 Tu Beneficio Activo</h4>
                            <p>{beneficioTexto || "No tienes beneficios activos actualmente."}</p>
                        </div>

                        <div className="profile-actions">
                            <button className="btn-secondary">Ver mis Pedidos</button>
                            <button onClick={logout} className="btn-danger">
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>

                    {/* Debugging: Solo para desarrollo, quitar en producción */}
                    <div className="debug-info" style={{marginTop: '2rem', opacity: 0.6, fontSize: '0.8rem'}}>
                        <p>ID Interno (BD): {usuarioActual?.id}</p>
                        <p>Rol Backend: {usuarioActual?.rol}</p>
                    </div>
                </div>
            </section>
        </ProtectedRoute>
    );
}