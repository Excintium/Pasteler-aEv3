import type { Route } from "./+types/perfil";
import { useAuth } from "~/services/auth-context";
import ProtectedRoute from "~/components/layout/ProtectedRoute";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Mi Perfil - Pastelería Mil Sabores" }];
}

export default function Perfil() {
    const { usuarioActual, logout, obtenerBeneficioUsuario } = useAuth();

    // Obtenemos el texto del beneficio según la lógica de negocio
    const beneficioTexto = obtenerBeneficioUsuario();

    return (
        <ProtectedRoute>
            <section className="section active profile-section">
                <div className="container">
                    <div className="profile-card animate-fade-in">
                        {/* Cabecera visual decorativa */}
                        <div className="profile-header-visual" style={{
                            background: 'var(--color-rosa-suave)',
                            height: '100px',
                            borderRadius: '1rem 1rem 0 0',
                            marginBottom: '-50px'
                        }}></div>

                        <div className="profile-content" style={{ padding: '0 2rem 2rem', textAlign: 'center' }}>
                            {/* Avatar circular mejorado */}
                            <div className="profile-avatar" style={{
                                width: '100px', height: '100px', margin: '0 auto 1rem',
                                border: '4px solid white', fontSize: '2.5rem',
                                background: 'var(--color-chocolate)', color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                                {usuarioActual?.nombre?.charAt(0).toUpperCase() || "U"}
                            </div>

                            <h2 style={{ color: 'var(--color-chocolate)', marginBottom: '0.2rem' }}>
                                {usuarioActual?.nombre}
                            </h2>
                            <p className="email" style={{ color: '#666' }}>{usuarioActual?.email}</p>

                            {/* Insignia de tipo de usuario */}
                            <div className="user-badge" style={{ margin: '1rem 0' }}>
                                <span className={`badge ${usuarioActual?.tipoUsuario}`} style={{
                                    padding: '0.5rem 1rem', borderRadius: '20px',
                                    background: 'var(--color-dorado)', fontWeight: 'bold',
                                    fontSize: '0.9rem', color: '#8B4513'
                                }}>
                                    {usuarioActual?.tipoUsuario === 'estudiante_duoc' ? '🎓 Estudiante Duoc' :
                                        usuarioActual?.tipoUsuario === 'mayor' ? '🧓 Adulto Mayor' : '😊 Cliente Regular'}
                                </span>
                            </div>

                            {/* Caja de beneficios destacada */}
                            <div className="profile-benefit-box" style={{
                                background: '#fff9f0', padding: '1.5rem',
                                borderRadius: '10px', border: '1px dashed var(--color-chocolate)',
                                margin: '1.5rem 0'
                            }}>
                                <h4 style={{ color: 'var(--color-chocolate)', marginBottom: '0.5rem' }}>
                                    <i className="fas fa-gift"></i> Tu Beneficio Activo
                                </h4>
                                <p style={{ margin: 0 }}>{beneficioTexto || "No tienes beneficios activos actualmente."}</p>
                            </div>

                            {/* Botones de acción */}
                            <div className="profile-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/cart" className="btn-secondary">
                                    <i className="fas fa-shopping-bag"></i> Ver Carrito
                                </Link>

                                {/* Botón visible solo para admins (lógica simple para demo) */}
                                {usuarioActual?.email.includes('admin') || usuarioActual?.rol === 'admin' ? (
                                    <Link to="/admin" className="btn-primary">
                                        <i className="fas fa-chart-line"></i> Panel Admin
                                    </Link>
                                ) : null}

                                <button onClick={logout} className="btn-danger" style={{
                                    background: '#ff6b6b', color: 'white', padding: '0.8rem 1.5rem',
                                    borderRadius: '25px', border: 'none', fontWeight: '600', cursor: 'pointer'
                                }}>
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ProtectedRoute>
    );
}