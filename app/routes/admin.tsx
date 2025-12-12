import { useAuth } from "~/services/auth-context";
import { useNavigate, Link } from "react-router";
import { useEffect, useState, type FormEvent } from "react";
import { api } from "~/services/api"; // Asegúrate de tener axios configurado aquí

export function meta() {
    return [{ title: "Dashboard Admin - Mil Sabores" }];
}

// Tipos para los formularios
type TabType = 'resumen' | 'usuarios' | 'productos' | 'blog';

export default function AdminDashboard() {
    const { usuarioActual, isLoading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('resumen');

    // Protección de ruta: Solo admins deberían ver esto (idealmente validado también en backend)
    useEffect(() => {
        if (!isLoading) {
            if (!usuarioActual) {
                navigate("/login");
            } else if (usuarioActual.tipoUsuario !== 'admin') {
                // Si entra un usuario normal, lo mandamos al perfil
                navigate("/perfil");
            }
        }
    }, [usuarioActual, isLoading, navigate]);

    if (isLoading) return <div className="container p-lg text-center">Cargando panel de administración...</div>;

    // Renderizado dinámico según la pestaña
    const renderContent = () => {
        switch (activeTab) {
            case 'resumen': return <DashboardSummary />;
            case 'usuarios': return <UserCreateForm />;
            case 'productos': return <ProductCreateForm />;
            case 'blog': return <BlogCreateForm />;
            default: return <DashboardSummary />;
        }
    };

    return (
        <section className="section active">
            <div className="container">
                {/* Header del Dashboard */}
                <div style={styles.headerContainer}>
                    <div>
                        <h2 className="section-title" style={{ margin: 0 }}>Panel de Administración</h2>
                        <p className="section-subtitle" style={{textAlign: 'left', marginTop: '0.5rem'}}>
                            Bienvenido, {usuarioActual?.nombre}
                        </p>
                    </div>
                    <Link to="/perfil" className="btn-secondary">Volver al Perfil</Link>
                </div>

                {/* Navegación por Pestañas */}
                <div style={styles.tabsContainer}>
                    <TabButton label="📊 Resumen" active={activeTab === 'resumen'} onClick={() => setActiveTab('resumen')} />
                    <TabButton label="👥 Usuarios" active={activeTab === 'usuarios'} onClick={() => setActiveTab('usuarios')} />
                    <TabButton label="🍰 Productos" active={activeTab === 'productos'} onClick={() => setActiveTab('productos')} />
                    <TabButton label="📝 Blog" active={activeTab === 'blog'} onClick={() => setActiveTab('blog')} />
                </div>

                {/* Contenido Dinámico */}
                <div style={styles.contentArea}>
                    {renderContent()}
                </div>
            </div>
        </section>
    );
}

// --- SUB-COMPONENTES (Atomizados para limpieza) ---

function TabButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                ...styles.tabButton,
                backgroundColor: active ? 'var(--first-color)' : 'transparent',
                color: active ? '#fff' : 'var(--title-color)',
                borderColor: active ? 'var(--first-color)' : '#ddd'
            }}
        >
            {label}
        </button>
    );
}

/** Pestaña 1: Resumen (Lo que ya existía) */
function DashboardSummary() {
    return (
        <div className="fade-in">
            <h3 style={{marginBottom: '1.5rem'}}>Resumen de Ventas y Gestión</h3>

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

            <div className="summary-card" style={{marginTop: '2rem'}}>
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
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/** Pestaña 2: Crear Usuario (Con Rol) */
function UserCreateForm() {
    const { register } = useAuth(); // Usamos la función del contexto
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            setMsg("Creando usuario...");
            // Llamamos al registro pasando el rol explícitamente
            await register({
                nombre: data.nombre as string,
                email: data.email as string,
                password: data.password as string,
                fechaNacimiento: data.fechaNacimiento as string,
                rol: data.rol as string
            });
            setMsg("✅ Usuario creado exitosamente");
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            setMsg("❌ Error al crear usuario. Verifica los datos.");
            console.error(error);
        }
    };

    return (
        <div className="summary-card fade-in" style={{maxWidth: '600px', margin: '0 auto'}}>
            <h3>👤 Crear Nuevo Usuario</h3>
            <form onSubmit={handleSubmit} style={styles.formGrid}>
                <div style={styles.formGroup}>
                    <label>Nombre Completo</label>
                    <input name="nombre" type="text" className="contact__input" required />
                </div>
                <div style={styles.formGroup}>
                    <label>Email</label>
                    <input name="email" type="email" className="contact__input" required />
                </div>
                <div style={styles.formGroup}>
                    <label>Contraseña</label>
                    <input name="password" type="password" className="contact__input" required />
                </div>
                <div style={styles.formGroup}>
                    <label>Fecha de Nacimiento</label>
                    <input name="fechaNacimiento" type="date" className="contact__input" required />
                </div>
                <div style={styles.formGroup}>
                    <label>Rol del Sistema</label>
                    <select name="rol" className="contact__input" style={{backgroundColor: 'white'}}>
                        <option value="user">Usuario Regular</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <button type="submit" className="button" style={{marginTop: '1rem'}}>Registrar Usuario</button>
                {msg && <p style={{marginTop: '1rem', fontWeight: 'bold'}}>{msg}</p>}
            </form>
        </div>
    );
}

/** Pestaña 3: Crear Producto */
function ProductCreateForm() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        console.log("Enviando producto al backend:", data);
        // Aquí conectarías con: await api.post('/products', data);
        alert("Simulación: Producto creado (ver consola)");
    };

    return (
        <div className="summary-card fade-in" style={{maxWidth: '800px', margin: '0 auto'}}>
            <h3>🍰 Agregar Nuevo Producto</h3>
            <form onSubmit={handleSubmit} style={styles.formGrid}>
                <div style={styles.formGroup}>
                    <label>Nombre del Producto</label>
                    <input name="name" type="text" className="contact__input" required />
                </div>
                <div style={styles.formGroup}>
                    <label>Precio ($)</label>
                    <input name="price" type="number" className="contact__input" required />
                </div>
                <div style={styles.formGroup} className="full-width">
                    <label>Descripción</label>
                    <textarea name="description" className="contact__input" rows={3}></textarea>
                </div>
                <div style={styles.formGroup}>
                    <label>Stock Inicial</label>
                    <input name="stock" type="number" className="contact__input" defaultValue={10} />
                </div>
                <div style={styles.formGroup}>
                    <label>Categoría</label>
                    <select name="category" className="contact__input">
                        <option value="tortas">Tortas</option>
                        <option value="sin_azucar">Sin Azúcar</option>
                        <option value="vegano">Vegano</option>
                        <option value="reposteria">Repostería</option>
                    </select>
                </div>
                <div style={styles.formGroup} className="full-width">
                    <label>URL de la Imagen</label>
                    <input name="image" type="url" className="contact__input" placeholder="https://..." />
                </div>
                <button type="submit" className="button" style={{marginTop: '1rem'}}>Guardar Producto</button>
            </form>
        </div>
    );
}

/** Pestaña 4: Crear Entrada de Blog */
function BlogCreateForm() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        console.log("Enviando post al backend:", data);
        // Aquí conectarías con: await api.post('/posts', data);
        alert("Simulación: Post publicado (ver consola)");
    };

    return (
        <div className="summary-card fade-in" style={{maxWidth: '800px', margin: '0 auto'}}>
            <h3>📝 Redactar Contenido para Blog</h3>
            <form onSubmit={handleSubmit} style={styles.formGrid}>
                <div style={styles.formGroup} className="full-width">
                    <label>Título del Artículo</label>
                    <input name="title" type="text" className="contact__input" required placeholder="Ej: 5 Tips para un bizcocho perfecto" />
                </div>

                <div style={styles.formGroup}>
                    <label>Tipo de Contenido</label>
                    <select name="type" className="contact__input">
                        <option value="receta">Receta</option>
                        <option value="tip">Tip / Consejo</option>
                        <option value="historia">Historia</option>
                        <option value="evento">Evento</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label>Autor</label>
                    <input name="author" type="text" className="contact__input" defaultValue="Admin Mil Sabores" />
                </div>

                <div style={styles.formGroup} className="full-width">
                    <label>Contenido</label>
                    <textarea name="content" className="contact__input" rows={8} placeholder="Escribe aquí tu artículo..."></textarea>
                </div>

                <div style={styles.formGroup} className="full-width">
                    <label>Imagen de Portada (URL)</label>
                    <input name="coverImage" type="url" className="contact__input" />
                </div>

                <button type="submit" className="button" style={{marginTop: '1rem'}}>Publicar Entrada</button>
            </form>
        </div>
    );
}

// --- ESTILOS INLINE (Para mantener todo en un archivo sin crear CSS modules extra) ---
const styles = {
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
    },
    tabsContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '2rem',
        borderBottom: '1px solid #ddd',
        paddingBottom: '10px',
        flexWrap: 'wrap' as const
    },
    tabButton: {
        padding: '10px 20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: 600,
        transition: 'all 0.3s ease'
    },
    contentArea: {
        minHeight: '400px'
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginTop: '1rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.5rem',
        textAlign: 'left' as const
    }
};

// CSS hack para clases que podrían no estar en tu hoja de estilos global
// (Normalmente esto iría en app.css)
/*
.full-width {
    grid-column: 1 / -1;
}
.fade-in {
    animation: fadeIn 0.3s ease-in;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
*/