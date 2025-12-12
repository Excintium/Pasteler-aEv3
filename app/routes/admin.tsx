import { useAuth } from "~/services/auth-context";
import { useNavigate, Link } from "react-router";
import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { api } from "~/services/api";

export function meta() {
    return [{ title: "Dashboard Admin - Mil Sabores" }];
}

type TabType = 'resumen' | 'usuarios' | 'productos' | 'blog';

/**
 * --- INTERFACES DE DATOS (Frontend) ---
 * Alineadas con los DTOs y Entities de NestJS
 */

interface User {
    id: string;
    name: string; // Backend envía 'name'
    email: string;
    rol: string;
    fechaNacimiento?: string | Date;
}

interface Product {
    id: number; // Backend usa number para productos
    codigo: string;
    nombre: string;
    categoria: string;
    precio: number;
    descripcion: string;
    imagen: string;
    destacado: boolean;
}

interface Post {
    id: number; // Backend usa number para posts
    titulo: string;
    contenido: string;
    autor?: string;
    categoria?: string;
    imagen?: string;
    createdAt?: string;
}

/**
 * COMPONENTE PRINCIPAL
 */
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
            case 'usuarios': return <UserManagementPanel />;
            case 'productos': return <ProductManagementPanel />; // Nuevo Componente Refactorizado
            case 'blog': return <BlogManagementPanel />;       // Nuevo Componente Refactorizado
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
                            👨‍🍳 Bienvenido a la cocina, {usuarioActual?.nombre || "Chef"}
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

// --- SUB-COMPONENTES DE UI ---

function TabButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                ...pastryStyles.tabButton,
                backgroundColor: active ? '#D2691E' : 'transparent',
                color: active ? '#fff' : '#8B4513',
                border: active ? 'none' : '1px dashed #D2691E',
                boxShadow: active ? '0 4px 10px rgba(210, 105, 30, 0.3)' : 'none'
            }}
        >
            {label}
        </button>
    );
}

/**
 * PESTAÑA 1: RESUMEN
 */
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
            {/* Tabla Estática de Ejemplo (Podrías conectarla a una API de Orders después) */}
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

/**
 * PESTAÑA 2: GESTIÓN DE USUARIOS
 * (Versión corregida previamente)
 */
function UserManagementPanel() {
    const { register } = useAuth();
    const [msg, setMsg] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        email: '',
        password: '',
        fechaNacimiento: '',
        rol: 'user'
    });

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        setIsLoadingList(true);
        try {
            const { data } = await api.get<User[]>('/users');
            setUsers(data);
        } catch (error) {
            setMsg({ text: "Error al cargar usuarios.", type: 'error' });
        } finally { setIsLoadingList(false); }
    };

    const resetForm = () => {
        setFormData({ id: '', nombre: '', email: '', password: '', fechaNacimiento: '', rol: 'user' });
        setIsEditing(false);
        setMsg(null);
    };

    const handleEditClick = (user: User) => {
        setMsg(null);
        setIsEditing(true);
        let fechaFormat = '';
        if (user.fechaNacimiento) {
            const dateObj = new Date(user.fechaNacimiento);
            if (!isNaN(dateObj.getTime())) fechaFormat = dateObj.toISOString().split('T')[0];
        }
        setFormData({
            id: user.id,
            nombre: user.name,
            email: user.email,
            password: '',
            fechaNacimiento: fechaFormat,
            rol: user.rol || 'user'
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMsg(null);
        try {
            if (isEditing) {
                const payload: any = {
                    name: formData.nombre,
                    email: formData.email,
                    rol: formData.rol,
                    fechaNacimiento: formData.fechaNacimiento ? new Date(formData.fechaNacimiento) : undefined
                };
                if (formData.password?.trim()) payload.password = formData.password;

                await api.patch(`/users/${formData.id}`, payload);
                setMsg({ text: "✅ Usuario actualizado.", type: 'success' });
            } else {
                await register({
                    nombre: formData.nombre,
                    email: formData.email,
                    password: formData.password,
                    fechaNacimiento: formData.fechaNacimiento,
                    rol: formData.rol
                });
                setMsg({ text: "✅ Usuario registrado.", type: 'success' });
            }
            resetForm();
            setTimeout(fetchUsers, 300);
        } catch (error: any) {
            const msgText = error.response?.data?.message || "Error al procesar.";
            setMsg({ text: `❌ ${Array.isArray(msgText) ? msgText.join(', ') : msgText}`, type: 'error' });
        }
    };

    const handleDeleteClick = async (id: string) => {
        if (!confirm("¿Eliminar usuario?")) return;
        try {
            await api.delete(`/users/${id}`);
            setMsg({ text: "🗑️ Usuario eliminado.", type: 'success' });
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (error) { setMsg({ text: "❌ Error al eliminar.", type: 'error' }); }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={pastryStyles.card}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h3 style={{...pastryStyles.cardTitle, marginBottom:0, borderBottom:'none'}}>
                        {isEditing ? "✏️ Editar Usuario" : "👤 Registrar Usuario"}
                    </h3>
                    {isEditing && <button onClick={resetForm} style={pastryStyles.secondaryButton}>Cancelar</button>}
                </div>
                <hr style={{borderColor:'#E6C9A8', opacity:0.3, margin:'1rem 0 2rem 0'}}/>
                <form onSubmit={handleSubmit} style={pastryStyles.formGrid}>
                    <div style={pastryStyles.formGroup}>
                        <label style={pastryStyles.label}>Nombre</label>
                        <input name="nombre" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} style={pastryStyles.input} required />
                    </div>
                    <div style={pastryStyles.formGroup}>
                        <label style={pastryStyles.label}>Email</label>
                        <input name="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" style={pastryStyles.input} required />
                    </div>
                    <div style={pastryStyles.formGroup}>
                        <label style={pastryStyles.label}>{isEditing ? "Contraseña (Opcional)" : "Contraseña"}</label>
                        <input name="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} type="password" style={pastryStyles.input} required={!isEditing} minLength={6} />
                    </div>
                    <div style={pastryStyles.formGroup}>
                        <label style={pastryStyles.label}>Fecha Nacimiento</label>
                        <input name="fechaNacimiento" value={formData.fechaNacimiento} onChange={e => setFormData({...formData, fechaNacimiento: e.target.value})} type="date" style={pastryStyles.input} required />
                    </div>
                    <div style={pastryStyles.formGroup}>
                        <label style={pastryStyles.label}>Rol</label>
                        <select name="rol" value={formData.rol} onChange={e => setFormData({...formData, rol: e.target.value})} style={{...pastryStyles.input, backgroundColor: 'white'}}>
                            <option value="user">Cliente</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                    <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                        <button type="submit" style={pastryStyles.primaryButton}>{isEditing ? "💾 Guardar Cambios" : "✨ Registrar"}</button>
                        {msg && <p style={{marginTop:'1rem', textAlign:'center', color: msg.type === 'success' ? 'green' : 'red', fontWeight:'bold'}}>{msg.text}</p>}
                    </div>
                </form>
            </div>
            <div style={pastryStyles.card}>
                <h3 style={pastryStyles.cardTitle}>👥 Lista de Usuarios</h3>
                {isLoadingList ? <p className="text-center">Cargando...</p> : (
                    <div style={{overflowX:'auto'}}>
                        <table style={{width:'100%', borderCollapse:'collapse', minWidth:'600px'}}>
                            <thead>
                            <tr style={{borderBottom:'2px solid #D2691E', color:'#8B4513'}}>
                                <th style={{padding:'10px', textAlign:'left'}}>Nombre</th>
                                <th style={{padding:'10px', textAlign:'left'}}>Email</th>
                                <th style={{padding:'10px', textAlign:'left'}}>Rol</th>
                                <th style={{padding:'10px', textAlign:'center'}}>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(u => (
                                <tr key={u.id} style={{borderBottom:'1px solid #eee'}}>
                                    <td style={{padding:'10px', color:'#5D4037'}}>{u.name}</td>
                                    <td style={{padding:'10px', color:'#666'}}>{u.email}</td>
                                    <td style={{padding:'10px'}}>{u.rol === 'admin' ? '👨‍🍳 Chef' : '👤 Cliente'}</td>
                                    <td style={{padding:'10px', textAlign:'center'}}>
                                        <button onClick={() => handleEditClick(u)} style={{marginRight:10, border:'none', background:'none', cursor:'pointer'}}>✏️</button>
                                        <button onClick={() => handleDeleteClick(u.id)} style={{border:'none', background:'none', cursor:'pointer'}}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * PESTAÑA 3: GESTIÓN DE PRODUCTOS
 * (Refactorizada con CRUD completo)
 */
function ProductManagementPanel() {
    const [msg, setMsg] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [isEditing, setIsEditing] = useState(false);

    // Estado del formulario
    const [formData, setFormData] = useState({
        id: 0,
        codigo: '',
        nombre: '',
        categoria: '',
        precio: '', // string para el input, se convierte al enviar
        stock: 10,
        descripcion: '',
        imagen: '',
        destacado: false
    });

    const categorias = [
        "Tortas Cuadradas", "Tortas Circulares", "Postres Individuales",
        "Productos Sin Azúcar", "Pastelería Tradicional", "Productos Sin Gluten",
        "Productos Vegana", "Tortas Especiales"
    ];

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get<Product[]>('/products');
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const resetForm = () => {
        setFormData({
            id: 0, codigo: '', nombre: '', categoria: '', precio: '',
            stock: 10, descripcion: '', imagen: '', destacado: false
        });
        setIsEditing(false);
        setMsg(null);
    };

    const handleEditClick = (prod: Product) => {
        setMsg(null);
        setIsEditing(true);
        setFormData({
            id: prod.id,
            codigo: prod.codigo,
            nombre: prod.nombre,
            categoria: prod.categoria,
            precio: String(prod.precio),
            stock: 10, // Stock no viene en entity por defecto, asumimos 10 o ajustar DTO
            descripcion: prod.descripcion,
            imagen: prod.imagen,
            destacado: prod.destacado
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = async (id: number) => {
        if (!confirm("¿Eliminar este producto del catálogo?")) return;
        try {
            await api.delete(`/products/${id}`);
            setMsg({ text: "🗑️ Producto eliminado.", type: 'success' });
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            setMsg({ text: "❌ Error al eliminar producto.", type: 'error' });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMsg(null);

        const payload = {
            codigo: formData.codigo.trim(),
            nombre: formData.nombre.trim(),
            categoria: formData.categoria,
            precio: Number(formData.precio),
            descripcion: formData.descripcion.trim(),
            imagen: formData.imagen.trim(),
            destacado: formData.destacado
        };

        if (payload.precio < 0) {
            setMsg({ text: "❌ El precio no puede ser negativo.", type: 'error' });
            setLoading(false);
            return;
        }

        try {
            if (isEditing) {
                await api.patch(`/products/${formData.id}`, payload);
                setMsg({ text: "✅ Producto actualizado correctamente.", type: 'success' });
            } else {
                await api.post('/products', payload);
                setMsg({ text: "✅ ¡Producto horneado y listo!", type: 'success' });
            }
            resetForm();
            setTimeout(fetchProducts, 300);
        } catch (error: any) {
            const errorMsg = error.response?.data?.message
                ? (Array.isArray(error.response.data.message) ? error.response.data.message.join(', ') : error.response.data.message)
                : "Error al guardar.";
            setMsg({ text: `❌ Error: ${errorMsg}`, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={pastryStyles.card}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h3 style={{...pastryStyles.cardTitle, marginBottom:0, borderBottom:'none'}}>
                        {isEditing ? "🍰 Editar Pastel" : "🍰 Nuevo Producto"}
                    </h3>
                    {isEditing && <button onClick={resetForm} style={pastryStyles.secondaryButton}>Cancelar</button>}
                </div>
                <hr style={{borderColor:'#E6C9A8', opacity:0.3, margin:'1rem 0 2rem 0'}}/>

                <form onSubmit={handleSubmit} style={pastryStyles.formGrid}>
                    <div style={pastryStyles.formGroup}>
                        <label style={pastryStyles.label}>Código (SKU)</label>
                        <input name="codigo" value={formData.codigo} onChange={e => setFormData({...formData, codigo: e.target.value})} placeholder="Ej: T-CHO-01" style={pastryStyles.input} required minLength={3} />
                    </div>
                    <div style={pastryStyles.formGroup}>
                        <label style={pastryStyles.label}>Nombre</label>
                        <input name="nombre" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} style={pastryStyles.input} required />
                    </div>
                    <div style={pastryStyles.formGroup}>
                        <label style={pastryStyles.label}>Precio ($)</label>
                        <input name="precio" type="number" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} style={pastryStyles.input} required />
                    </div>
                    <div style={pastryStyles.formGroup}>
                        <label style={pastryStyles.label}>Categoría</label>
                        <select name="categoria" value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})} style={{...pastryStyles.input, backgroundColor: 'white'}} required>
                            <option value="" disabled>Selecciona...</option>
                            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div style={{...pastryStyles.formGroup, gridColumn: '1 / -1'}}>
                        <label style={pastryStyles.label}>Descripción</label>
                        <textarea name="descripcion" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} style={pastryStyles.textarea} rows={3}></textarea>
                    </div>
                    <div style={{...pastryStyles.formGroup, gridColumn: '1 / -1'}}>
                        <label style={pastryStyles.label}>URL Imagen</label>
                        <input name="imagen" value={formData.imagen} onChange={e => setFormData({...formData, imagen: e.target.value})} type="text" style={pastryStyles.input} placeholder="https://..." />
                    </div>
                    <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input type="checkbox" checked={formData.destacado} onChange={e => setFormData({...formData, destacado: e.target.checked})} id="destacado" style={{width:'20px', height:'20px', accentColor:'#D2691E'}} />
                        <label htmlFor="destacado" style={{...pastryStyles.label, marginBottom: 0, cursor:'pointer'}}>Destacar en Vitrina</label>
                    </div>
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                        <button type="submit" style={pastryStyles.primaryButton} disabled={loading}>
                            {loading ? "Horneando..." : (isEditing ? "Guardar Cambios" : "Guardar Producto")}
                        </button>
                        {msg && <div style={{marginTop: '1rem', padding: '10px', borderRadius: '10px', backgroundColor: msg.type === 'success' ? '#d4edda' : '#f8d7da', color: msg.type === 'success' ? '#155724' : '#721c24'}}>{msg.text}</div>}
                    </div>
                </form>
            </div>

            {/* Lista Productos */}
            <div style={pastryStyles.card}>
                <h3 style={pastryStyles.cardTitle}>📋 Catálogo Actual</h3>
                <div style={{overflowX:'auto'}}>
                    <table style={{width:'100%', borderCollapse:'collapse', minWidth:'600px'}}>
                        <thead>
                        <tr style={{borderBottom:'2px solid #D2691E', color:'#8B4513'}}>
                            <th style={{padding:'10px', textAlign:'left'}}>SKU</th>
                            <th style={{padding:'10px', textAlign:'left'}}>Producto</th>
                            <th style={{padding:'10px', textAlign:'left'}}>Precio</th>
                            <th style={{padding:'10px', textAlign:'center'}}>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map(p => (
                            <tr key={p.id} style={{borderBottom:'1px solid #eee'}}>
                                <td style={{padding:'10px', color:'#666', fontSize:'0.9rem'}}>{p.codigo}</td>
                                <td style={{padding:'10px', color:'#5D4037', fontWeight:'bold'}}>
                                    {p.nombre} {p.destacado && '⭐'}
                                </td>
                                <td style={{padding:'10px', color:'#28a745'}}>${p.precio.toLocaleString()}</td>
                                <td style={{padding:'10px', textAlign:'center'}}>
                                    <button onClick={() => handleEditClick(p)} style={{marginRight:10, border:'none', background:'none', cursor:'pointer'}}>✏️</button>
                                    <button onClick={() => handleDeleteClick(p.id)} style={{border:'none', background:'none', cursor:'pointer'}}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/**
 * PESTAÑA 4: GESTIÓN DE BLOG
 * (Refactorizada con CRUD completo)
 */
function BlogManagementPanel() {
    const [msg, setMsg] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        id: 0,
        titulo: '',
        contenido: '',
        autor: 'Chef Mil Sabores',
        categoria: 'Recetas',
        imagen: ''
    });

    useEffect(() => { fetchPosts(); }, []);

    const fetchPosts = async () => {
        try {
            const { data } = await api.get<Post[]>('/posts');
            setPosts(data);
        } catch (error) { console.error(error); }
    };

    const resetForm = () => {
        setFormData({ id: 0, titulo: '', contenido: '', autor: 'Chef Mil Sabores', categoria: 'Recetas', imagen: '' });
        setIsEditing(false);
        setMsg(null);
    };

    const handleEditClick = (post: Post) => {
        setMsg(null);
        setIsEditing(true);
        setFormData({
            id: post.id,
            titulo: post.titulo,
            contenido: post.contenido,
            autor: post.autor || '',
            categoria: post.categoria || 'Recetas',
            imagen: post.imagen || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = async (id: number) => {
        if (!confirm("¿Eliminar este artículo del blog?")) return;
        try {
            await api.delete(`/posts/${id}`);
            setMsg({ text: "🗑️ Artículo eliminado.", type: 'success' });
            setPosts(prev => prev.filter(p => p.id !== id));
        } catch (error) { setMsg({ text: "❌ Error al eliminar.", type: 'error' }); }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMsg(null);

        const postData = {
            titulo: formData.titulo,
            contenido: formData.contenido,
            autor: formData.autor,
            categoria: formData.categoria,
            imagen: formData.imagen
        };

        try {
            if (isEditing) {
                await api.patch(`/posts/${formData.id}`, postData);
                setMsg({ text: "✅ Artículo actualizado.", type: 'success' });
            } else {
                await api.post('/posts', postData);
                setMsg({ text: "✅ Historia publicada.", type: 'success' });
            }
            resetForm();
            setTimeout(fetchPosts, 300);
        } catch (error) {
            setMsg({ text: "❌ Error al procesar el artículo.", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={pastryStyles.card}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h3 style={{...pastryStyles.cardTitle, marginBottom:0, borderBottom:'none'}}>
                        {isEditing ? "📝 Editar Artículo" : "📝 Escribir en Blog"}
                    </h3>
                    {isEditing && <button onClick={resetForm} style={pastryStyles.secondaryButton}>Cancelar</button>}
                </div>
                <hr style={{borderColor:'#E6C9A8', opacity:0.3, margin:'1rem 0 2rem 0'}}/>

                <form onSubmit={handleSubmit} style={pastryStyles.formGrid}>
                    <div style={{...pastryStyles.formGroup, gridColumn: '1 / -1'}}>
                        <label style={pastryStyles.label}>Título</label>
                        <input name="titulo" value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} style={pastryStyles.input} required />
                    </div>
                    <div style={pastryStyles.formGroup}>
                        <label style={pastryStyles.label}>Categoría</label>
                        <select name="categoria" value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})} style={{...pastryStyles.input, backgroundColor: 'white'}}>
                            <option value="Recetas">Receta</option>
                            <option value="Tips">Tip de Cocina</option>
                            <option value="Historia">Historia</option>
                            <option value="Eventos">Evento</option>
                        </select>
                    </div>
                    <div style={pastryStyles.formGroup}>
                        <label style={pastryStyles.label}>Autor</label>
                        <input name="autor" value={formData.autor} onChange={e => setFormData({...formData, autor: e.target.value})} style={pastryStyles.input} />
                    </div>
                    <div style={{...pastryStyles.formGroup, gridColumn: '1 / -1'}}>
                        <label style={pastryStyles.label}>Contenido</label>
                        <textarea name="contenido" value={formData.contenido} onChange={e => setFormData({...formData, contenido: e.target.value})} style={pastryStyles.textarea} rows={8}></textarea>
                    </div>
                    <div style={{...pastryStyles.formGroup, gridColumn: '1 / -1'}}>
                        <label style={pastryStyles.label}>Portada (URL o Emoji 🎂)</label>
                        <input name="imagen" value={formData.imagen} onChange={e => setFormData({...formData, imagen: e.target.value})} type="text" style={pastryStyles.input} />
                    </div>
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                        <button type="submit" style={pastryStyles.primaryButton} disabled={loading}>
                            {loading ? "Procesando..." : (isEditing ? "Actualizar Entrada" : "Publicar Entrada")}
                        </button>
                        {msg && <p style={{marginTop:'1rem', color: msg.type === 'success' ? 'green' : 'red', fontWeight:'bold'}}>{msg.text}</p>}
                    </div>
                </form>
            </div>

            <div style={pastryStyles.card}>
                <h3 style={pastryStyles.cardTitle}>📚 Entradas Publicadas</h3>
                <div style={{overflowX:'auto'}}>
                    <table style={{width:'100%', borderCollapse:'collapse', minWidth:'600px'}}>
                        <thead>
                        <tr style={{borderBottom:'2px solid #D2691E', color:'#8B4513'}}>
                            <th style={{padding:'10px', textAlign:'left'}}>Título</th>
                            <th style={{padding:'10px', textAlign:'left'}}>Categoría</th>
                            <th style={{padding:'10px', textAlign:'center'}}>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {posts.map(p => (
                            <tr key={p.id} style={{borderBottom:'1px solid #eee'}}>
                                <td style={{padding:'10px', color:'#5D4037', fontWeight:'bold'}}>
                                    {p.imagen && <span style={{marginRight:'5px'}}>{p.imagen.length < 5 ? p.imagen : '🖼️'}</span>}
                                    {p.titulo}
                                </td>
                                <td style={{padding:'10px', color:'#666'}}>{p.categoria}</td>
                                <td style={{padding:'10px', textAlign:'center'}}>
                                    <button onClick={() => handleEditClick(p)} style={{marginRight:10, border:'none', background:'none', cursor:'pointer'}}>✏️</button>
                                    <button onClick={() => handleDeleteClick(p.id)} style={{border:'none', background:'none', cursor:'pointer'}}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
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
        color: '#8B4513',
        fontFamily: '"Playfair Display", serif',
        fontSize: '2rem',
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#A0522D',
        fontSize: '1.5rem',
        marginBottom: '1.5rem',
        borderLeft: '4px solid #D2691E',
        paddingLeft: '10px'
    },
    secondaryButton: {
        backgroundColor: '#F5DEB3',
        color: '#8B4513',
        padding: '10px 20px',
        borderRadius: '20px',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: '0.3s',
        border: 'none',
        cursor: 'pointer'
    },
    tabsContainer: {
        display: 'flex',
        gap: '15px',
        marginBottom: '2.5rem',
        padding: '10px',
        backgroundColor: '#FFF8DC',
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
    card: {
        backgroundColor: '#FFFCF5',
        borderRadius: '20px',
        padding: '2.5rem',
        boxShadow: '0 10px 25px rgba(139, 69, 19, 0.1)',
        border: '1px solid #F0E6D2',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%'
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
        backgroundColor: '#D2691E',
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