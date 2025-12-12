import { useAuth } from "~/services/auth-context";
import { useNavigate, Link } from "react-router";
import { useEffect, useState, type FormEvent } from "react";
import { api } from "~/services/api";

export function meta() {
    return [{ title: "Dashboard Admin - Mil Sabores" }];
}

type TabType = 'resumen' | 'usuarios' | 'productos' | 'blog';

export default function AdminDashboard() {
    const { usuarioActual, isLoading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('resumen');

    useEffect(() => {
        if (!isLoading) {
            if (!usuarioActual || usuarioActual.tipoUsuario !== 'admin') {
                navigate(usuarioActual ? "/perfil" : "/login");
            }
        }
    }, [usuarioActual, isLoading, navigate]);

    if (isLoading) return <div className="container p-lg text-center">Horneando panel...</div>;

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
        <section className="section active" style={{ backgroundColor: '#fffdf9', minHeight: '100vh' }}>
            <div className="container">
                {/* Header Estilo Pastelero */}
                <div style={pastryStyles.headerContainer}>
                    <div>
                        <h2 className="section-title" style={{ ...pastryStyles.title, textAlign: 'left', margin: 0 }}>
                            Panel de Control
                        </h2>
                        <p style={{ color: '#8b5a2b', marginTop: '0.5rem', fontStyle: 'italic' }}>
                            👨‍🍳 Bienvenido a la cocina, {usuarioActual?.nombre}
                        </p>
                    </div>
                    <Link to="/perfil" className="btn-secondary" style={pastryStyles.secondaryButton}>
                        Volver al Perfil
                    </Link>
                </div>

                {/* Navegación Tabs */}
                <div style={pastryStyles.tabsContainer} className="grid grid-flow-col justify-items-center-safe ...">
                    <TabButton label="📊 Resumen" active={activeTab === 'resumen'} onClick={() => setActiveTab('resumen')} />
                    <TabButton label="👥 Usuarios" active={activeTab === 'usuarios'} onClick={() => setActiveTab('usuarios')} />
                    <TabButton label="🍰 Productos" active={activeTab === 'productos'} onClick={() => setActiveTab('productos')} />
                    <TabButton label="📝 Blog" active={activeTab === 'blog'} onClick={() => setActiveTab('blog')} />
                </div>

                {/* Contenido */}
                <div className="fade-in" style={{ padding: '1rem 0' }}>
                    {renderContent()}
                </div>
            </div>
        </section>
    );
}

// --- SUB-COMPONENTES ---

function TabButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                ...pastryStyles.tabButton,
                backgroundColor: active ? '#D2691E' : 'transparent', // Chocolate o transparente
                color: active ? '#fff' : '#8B4513',
                border: active ? 'none' : '1px dashed #D2691E',
                boxShadow: active ? '0 4px 10px rgba(210, 105, 30, 0.3)' : 'none'
            }}
        >
            {label}
        </button>
    );
}

/** Pestaña 1: Resumen */
function DashboardSummary() {
    return (
        <div>
            <h3 style={pastryStyles.subtitle}>Resumen del Día</h3>
            <div className="admin-dashboard">
                <div className="stat-card" style={pastryStyles.statCard}>
                    <h3 style={{color: '#8B4513'}}>Ventas del Día</h3>
                    <div className="stat-number" style={{color: '#D2691E'}}>$450.000</div>
                    <p style={{color: '#28a745'}}>⬆ 12% dulce incremento</p>
                </div>
                <div className="stat-card" style={pastryStyles.statCard}>
                    <h3 style={{color: '#8B4513'}}>Pedidos por Entregar</h3>
                    <div className="stat-number" style={{color: '#D2691E'}}>8</div>
                    <p style={{color: '#ffc107'}}>3 requieren decoración</p>
                </div>
                <div className="stat-card" style={pastryStyles.statCard}>
                    <h3 style={{color: '#8B4513'}}>Nuevos Clientes</h3>
                    <div className="stat-number" style={{color: '#D2691E'}}>15</div>
                    <p>Esta semana</p>
                </div>
                <div className="stat-card" style={pastryStyles.statCard}>
                    <h3 style={{color: '#8B4513'}}>Favorito del Mes</h3>
                    <div className="stat-number" style={{fontSize: '1.2rem', color: '#D2691E'}}>Torta Chocolate</div>
                    <p>24 unidades</p>
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

/** Pestaña 2: Usuarios */
function UserCreateForm() {
    const { register } = useAuth();
    const [msg, setMsg] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMsg(null);
        const formData = new FormData(e.currentTarget);
        try {
            await register({
                nombre: formData.get("nombre") as string,
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                fechaNacimiento: formData.get("fechaNacimiento") as string,
                rol: formData.get("rol") as string
            });
            setMsg({ text: "✅ Usuario registrado con dulzura.", type: 'success' });
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            setMsg({ text: "❌ Hubo un error en la mezcla. Intenta de nuevo.", type: 'error' });
        }
    };

    return (
        <div style={pastryStyles.card}>
            <h3 style={pastryStyles.cardTitle}>👤 Registrar Nuevo Usuario</h3>
            <form onSubmit={handleSubmit} style={pastryStyles.formGrid}>
                <div style={pastryStyles.formGroup}>
                    <label style={pastryStyles.label}>Nombre Completo</label>
                    <input name="nombre" type="text" style={pastryStyles.input} required />
                </div>
                <div style={pastryStyles.formGroup}>
                    <label style={pastryStyles.label}>Email</label>
                    <input name="email" type="email" style={pastryStyles.input} required />
                </div>
                <div style={pastryStyles.formGroup}>
                    <label style={pastryStyles.label}>Contraseña</label>
                    <input name="password" type="password" style={pastryStyles.input} required />
                </div>
                <div style={pastryStyles.formGroup}>
                    <label style={pastryStyles.label}>Fecha de Nacimiento</label>
                    <input name="fechaNacimiento" type="date" style={pastryStyles.input} required />
                </div>
                <div style={pastryStyles.formGroup}>
                    <label style={pastryStyles.label}>Rol en la Cocina</label>
                    <select name="rol" style={{...pastryStyles.input, backgroundColor: 'white'}}>
                        <option value="user">Cliente (Comensal)</option>
                        <option value="admin">Administrador (Chef)</option>
                    </select>
                </div>
                <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                    <button type="submit" style={pastryStyles.primaryButton}>Registrar Usuario</button>
                    {msg && <p style={{
                        marginTop: '1rem',
                        color: msg.type === 'success' ? '#28a745' : '#dc3545',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>{msg.text}</p>}
                </div>
            </form>
        </div>
    );
}

/** Pestaña 3: Productos */
function ProductCreateForm() {
    const [msg, setMsg] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMsg(null);
        const formData = new FormData(e.currentTarget);

        const payload = {
            codigo: String(formData.get("codigo")).trim(),
            nombre: String(formData.get("nombre")).trim(),
            categoria: String(formData.get("categoria")),
            precio: Number(formData.get("precio")),
            descripcion: String(formData.get("descripcion")).trim(),
            imagen: String(formData.get("imagen")).trim(),
            destacado: formData.get("destacado") === 'on'
        };

        if (payload.precio < 0) {
            setMsg({ text: "❌ El precio no puede ser negativo.", type: 'error' });
            setLoading(false);
            return;
        }

        try {
            await api.post('/products', payload);
            setMsg({ text: "✅ ¡Producto horneado y listo en catálogo!", type: 'success' });
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            const errorMsg = error.response?.data?.message
                ? (Array.isArray(error.response.data.message) ? error.response.data.message.join(', ') : error.response.data.message)
                : "Error al guardar.";
            setMsg({ text: `❌ Error: ${errorMsg}`, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const categorias = [
        "Tortas Cuadradas", "Tortas Circulares", "Postres Individuales",
        "Productos Sin Azúcar", "Pastelería Tradicional", "Productos Sin Gluten",
        "Productos Vegana", "Tortas Especiales"
    ];

    return (
        <div style={pastryStyles.card}>
            <h3 style={pastryStyles.cardTitle}>🍰 Nuevo Producto para Vitrina</h3>
            <form onSubmit={handleSubmit} style={pastryStyles.formGrid}>
                <div style={pastryStyles.formGroup}>
                    <label style={pastryStyles.label}>Código (SKU)</label>
                    <input name="codigo" placeholder="Ej: T-CHO-01" style={pastryStyles.input} required minLength={3} />
                </div>
                <div style={pastryStyles.formGroup}>
                    <label style={pastryStyles.label}>Nombre del Pastel</label>
                    <input name="nombre" style={pastryStyles.input} required />
                </div>
                <div style={pastryStyles.formGroup}>
                    <label style={pastryStyles.label}>Precio ($)</label>
                    <input name="precio" type="number" style={pastryStyles.input} required />
                </div>
                <div style={pastryStyles.formGroup}>
                    <label style={pastryStyles.label}>Stock Inicial</label>
                    <input name="stock" type="number" style={pastryStyles.input} defaultValue={10} />
                </div>
                <div style={pastryStyles.formGroup}>
                    <label style={pastryStyles.label}>Categoría</label>
                    <select name="categoria" style={{...pastryStyles.input, backgroundColor: 'white'}} required>
                        <option value="" disabled selected>Selecciona una categoría...</option>
                        {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div style={{...pastryStyles.formGroup, gridColumn: '1 / -1'}}>
                    <label style={pastryStyles.label}>Descripción Tentadora</label>
                    <textarea name="descripcion" style={pastryStyles.textarea} rows={3}></textarea>
                </div>
                <div style={{...pastryStyles.formGroup, gridColumn: '1 / -1'}}>
                    <label style={pastryStyles.label}>URL de la Imagen</label>
                    <input name="imagen" type="url" style={pastryStyles.input} placeholder="https://..." />
                </div>
                <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0' }}>
                    <input type="checkbox" name="destacado" id="destacado" style={{width: '20px', height: '20px', accentColor: '#D2691E'}} />
                    <label htmlFor="destacado" style={{...pastryStyles.label, marginBottom: 0, cursor: 'pointer'}}>Destacar en Vitrina Principal</label>
                </div>
                <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                    <button type="submit" style={pastryStyles.primaryButton} disabled={loading}>
                        {loading ? "Horneando..." : "Guardar Producto"}
                    </button>
                    {msg && <div style={{
                        marginTop: '1rem', padding: '10px', borderRadius: '10px',
                        backgroundColor: msg.type === 'success' ? '#d4edda' : '#f8d7da',
                        color: msg.type === 'success' ? '#155724' : '#721c24'
                    }}>{msg.text}</div>}
                </div>
            </form>
        </div>
    );
}

/** Pestaña 4: Blog */
function BlogCreateForm() {
    const [msg, setMsg] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMsg(null);
        const formData = new FormData(e.currentTarget);
        const postData = {
            titulo: formData.get("titulo"),
            contenido: formData.get("contenido"),
            autor: formData.get("autor"),
            categoria: formData.get("categoria"),
            imagen: formData.get("imagen")
        };

        try {
            await api.post('/posts', postData);
            setMsg({ text: "✅ Receta publicada con éxito.", type: 'success' });
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            setMsg({ text: "❌ Error al publicar la historia.", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={pastryStyles.card}>
            <h3 style={pastryStyles.cardTitle}>📝 Escribir en el Blog Dulce</h3>
            <form onSubmit={handleSubmit} style={pastryStyles.formGrid}>
                <div style={{...pastryStyles.formGroup, gridColumn: '1 / -1'}}>
                    <label style={pastryStyles.label}>Título del Artículo</label>
                    <input name="titulo" style={pastryStyles.input} placeholder="Ej: Secretos del Merengue Perfecto" required />
                </div>
                <div style={pastryStyles.formGroup}>
                    <label style={pastryStyles.label}>Tipo de Contenido</label>
                    <select name="categoria" style={{...pastryStyles.input, backgroundColor: 'white'}}>
                        <option value="Recetas">Receta</option>
                        <option value="Tips">Tip de Cocina</option>
                        <option value="Historia">Historia</option>
                        <option value="Eventos">Evento</option>
                    </select>
                </div>
                <div style={pastryStyles.formGroup}>
                    <label style={pastryStyles.label}>Autor</label>
                    <input name="autor" style={pastryStyles.input} defaultValue="Chef Mil Sabores" />
                </div>
                <div style={{...pastryStyles.formGroup, gridColumn: '1 / -1'}}>
                    <label style={pastryStyles.label}>Contenido</label>
                    <textarea name="contenido" style={pastryStyles.textarea} rows={8} placeholder="Érase una vez..."></textarea>
                </div>
                <div style={{...pastryStyles.formGroup, gridColumn: '1 / -1'}}>
                    <label style={pastryStyles.label}>Portada (URL de imagen o Emoji)</label>
                    <input
                        name="imagen"
                        type="text" // Cambiado a 'text' para permitir Emojis
                        style={pastryStyles.input}
                        placeholder="Utilize emoji 🎂"
                    />
                    <small style={{color: '#8b5a2b', fontStyle: 'italic', marginTop: '5px'}}>
                        Tip: Puedes pegar una URL de foto o simplemente usar un emoji para destacar.
                    </small>
                </div>
                <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                    <button type="submit" style={pastryStyles.primaryButton} disabled={loading}>
                        {loading ? "Publicando..." : "Publicar Entrada"}
                    </button>
                    {msg && <p style={{marginTop:'1rem', color: msg.type === 'success' ? 'green' : 'red', fontWeight:'bold'}}>{msg.text}</p>}
                </div>
            </form>
        </div>
    );
}

// --- ESTILOS "PASTELERO" (CSS-in-JS) ---
const pastryStyles = {
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        borderBottom: '2px solid #F0E6D2',
        paddingBottom: '1rem'
    },
    title: {
        color: '#8B4513', // Chocolate saddlebrown
        fontFamily: '"Playfair Display", serif', // Fuente elegante si está disponible
        fontSize: '2rem',
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#A0522D', // Sienna
        fontSize: '1.5rem',
        marginBottom: '1.5rem',
        borderLeft: '4px solid #D2691E',
        paddingLeft: '10px'
    },
    secondaryButton: {
        backgroundColor: '#F5DEB3', // Wheat
        color: '#8B4513',
        padding: '10px 20px',
        borderRadius: '20px',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: '0.3s'
    },
    tabsContainer: {
        display: 'flex',
        gap: '15px',
        marginBottom: '2.5rem',
        padding: '10px',
        backgroundColor: '#FFF8DC', // Cornsilk
        borderRadius: '25px',
        overflowX: 'auto' as const,
        justifyContent: 'center'
    },
    tabButton: {
        padding: '12px 25px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 600,
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap' as const
    },
    // --- ESTILOS DE TARJETA FORMULARIO ---
    card: {
        backgroundColor: '#FFFCF5', // Crema muy suave
        borderRadius: '20px',
        padding: '2.5rem',
        boxShadow: '0 10px 25px rgba(139, 69, 19, 0.1)', // Sombra chocolate suave
        border: '1px solid #F0E6D2',
        maxWidth: '800px',
        margin: '0 auto'
    },
    cardTitle: {
        textAlign: 'center' as const,
        color: '#8B4513',
        marginBottom: '2rem',
        fontSize: '1.8rem',
        borderBottom: '2px dashed #E6C9A8',
        paddingBottom: '1rem'
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.5rem',
        textAlign: 'left' as const
    },
    label: {
        color: '#8B5A2B',
        fontWeight: 'bold',
        fontSize: '0.95rem',
        marginLeft: '5px'
    },
    input: {
        width: '100%',
        padding: '12px 15px',
        borderRadius: '12px',
        border: '1px solid #E6C9A8',
        backgroundColor: '#fff',
        fontSize: '1rem',
        color: '#5D4037',
        outline: 'none',
        transition: 'border 0.3s'
    },
    textarea: {
        width: '100%',
        padding: '15px',
        borderRadius: '12px',
        border: '1px solid #E6C9A8',
        backgroundColor: '#fff',
        fontSize: '1rem',
        color: '#5D4037',
        fontFamily: 'inherit',
        resize: 'vertical' as const
    },
    primaryButton: {
        backgroundColor: '#D2691E', // Chocolate
        color: 'white',
        border: 'none',
        padding: '14px 40px',
        borderRadius: '30px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(210, 105, 30, 0.4)',
        transition: 'transform 0.2s',
        width: '100%'
    },
    statCard: {
        backgroundColor: '#FFF8DC',
        borderRadius: '15px',
        padding: '1.5rem',
        textAlign: 'center' as const,
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        border: '1px solid #F0E6D2'
    }
};
