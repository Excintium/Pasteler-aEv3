import { useAuth } from "~/services/auth-context";
import { useNavigate, Link } from "react-router";
import { useEffect } from "react";

export function meta() {
    return [{ title: "Dashboard Admin - Mil Sabores" }];
}

export default function AdminDashboard() {
    const { usuarioActual, isLoading } = useAuth();
    const navigate = useNavigate();

    // Protección simple: si no hay usuario, mandar al login
    useEffect(() => {
        if (!isLoading && !usuarioActual) {
            navigate("/login");
        }
    }, [usuarioActual, isLoading, navigate]);

    if (isLoading) return <div className="container p-lg">Cargando panel...</div>;

    return (
        <section className="section active">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 className="section-title" style={{ margin: 0 }}>Panel de Administración</h2>
                    <Link to="/perfil" className="btn-secondary">Volver al Perfil</Link>
                </div>

                <p className="section-subtitle">Resumen de ventas y gestión de tienda</p>

                {/* Dashboard Stats */}
                <div className="admin-dashboard">
                    <div className="stat-card">
                        <h3>Ventas del Día</h3>
                        <div className="stat-number">$450.000</div>
                        <p className="text-success"><i className="fas fa-arrow-up"></i> 12% vs ayer</p>
                    </div>
                    <div className="stat-card">
                        <h3>Pedidos Pendientes</h3>
                        <div className="stat-number">8</div>
                        <p className="text-warning">3 requieren entrega urgente</p>
                    </div>
                    <div className="stat-card">
                        <h3>Usuarios Nuevos</h3>
                        <div className="stat-number">15</div>
                        <p>Esta semana</p>
                    </div>
                    <div className="stat-card">
                        <h3>Producto Top</h3>
                        <div className="stat-number" style={{fontSize: '1.2rem'}}>Torta Chocolate</div>
                        <p>24 unidades vendidas</p>
                    </div>
                </div>

                {/* Tabla Reciente (Simulada) */}
                <div className="summary-card">
                    <h3>📦 Últimos Pedidos</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                        <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                            <th style={{ padding: '10px' }}>ID</th>
                            <th style={{ padding: '10px' }}>Cliente</th>
                            <th style={{ padding: '10px' }}>Total</th>
                            <th style={{ padding: '10px' }}>Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px' }}>#1023</td>
                            <td style={{ padding: '10px' }}>Juan Pérez</td>
                            <td style={{ padding: '10px' }}>$45.000</td>
                            <td style={{ padding: '10px', color: 'green', fontWeight: 'bold' }}>Completado</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px' }}>#1024</td>
                            <td style={{ padding: '10px' }}>María González</td>
                            <td style={{ padding: '10px' }}>$22.500</td>
                            <td style={{ padding: '10px', color: 'orange', fontWeight: 'bold' }}>En Proceso</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px' }}>#1025</td>
                            <td style={{ padding: '10px' }}>Carlos Ruiz</td>
                            <td style={{ padding: '10px' }}>$15.000</td>
                            <td style={{ padding: '10px', color: 'red', fontWeight: 'bold' }}>Pendiente</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}