// app/routes/blog.tsx
import type { Route } from "./+types/blog";
import { useState, useEffect } from "react";
import { BlogCard } from "~/components/molecules/BlogCard";
import { api } from "~/services/api";
import type { Articulo } from "~/data/blog";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Blog - Pastelería Mil Sabores" },
        { name: "description", content: "Recetas, tips y dulzura." },
    ];
}

const CATEGORIES = [
    { id: "todas", label: "Todos" },
    { id: "recetas", label: "Recetas" }, // Coincide con value="recetas" del admin
    { id: "tips", label: "Tips" },
    { id: "historia", label: "Historia" },
    { id: "eventos", label: "Eventos" },
];

export default function BlogPage() {
    // Estado local para los artículos traídos del backend
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeCategory, setActiveCategory] = useState<string>("todas");
    const [error, setError] = useState<string | null>(null);

    /**
     * Effect: Carga de artículos desde el Backend (NestJS).
     * Endpoint: GET /posts
     */
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await api.get('/posts');

                // Transformación de datos (Backend -> Frontend)
                // Convertimos el formato de BD (createdAt, etc.) al formato visual (Articulo)
                const postsFormateados: Articulo[] = response.data.map((post: any) => ({
                    id: post.id,
                    titulo: post.titulo,
                    // Convertimos la categoría a minúscula para asegurar que el filtro funcione
                    categoria: post.categoria ? post.categoria.toLowerCase() : 'otros',
                    contenido: post.contenido,
                    fecha: new Date(post.createdAt).toLocaleDateString('es-CL', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    }),
                    autor: post.autor || 'Chef Mil Sabores',
                    // Si viene null, ponemos un fallback de emoji
                    imagen: post.imagen || '🍰'
                }));

                setArticulos(postsFormateados);
            } catch (err) {
                console.error("Error al cargar blog:", err);
                setError("Hubo un problema trayendo las recetas del horno.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Lógica de Filtrado (sucede en el cliente)
    const filteredArticles = activeCategory === "todas"
        ? articulos
        : articulos.filter((a) => a.categoria === activeCategory);

    return (
        <section id="blog" className="section active">
            <div className="container">
                <h2 className="section-title">Blog Dulce</h2>
                <p className="section-subtitle">
                    Historias recién horneadas para ti.
                </p>

                {/* Filtros */}
                <div className="filters blog-filters">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            className={"filter-btn" + (activeCategory === cat.id ? " active" : "")}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Estados de UI */}
                {loading && <div className="text-center p-5">🧁 Horneando contenido...</div>}

                {error && <div className="text-center p-5" style={{color: 'red'}}>{error}</div>}

                {/* Grid de Artículos */}
                {!loading && !error && (
                    <div className="blog-grid">
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((articulo) => (
                                <BlogCard key={articulo.id} articulo={articulo} />
                            ))
                        ) : (
                            <p className="empty-message">
                                No hay entradas en esta categoría... ¡aún! 👨‍🍳
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}