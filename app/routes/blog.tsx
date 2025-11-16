// app/routes/blog.tsx
import type { Route } from "./+types/blog";
import { useState } from "react";
import { BLOG_ARTICULOS } from "~/data/blog";
import { BlogCard } from "~/components/molecules/BlogCard";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Blog - Pastelería Mil Sabores" },
        {
            name: "description",
            content:
                "Recetas, tips, historias y eventos de Pastelería Mil Sabores.",
        },
    ];
}

// Ojo: el id "historia" coincide con lo que pusiste en BLOG_ARTICULOS
const CATEGORIES = [
    { id: "todas", label: "Todos" },
    { id: "recetas", label: "Recetas" },
    { id: "tips", label: "Tips" },
    { id: "historia", label: "Historia" },
    { id: "eventos", label: "Eventos" },
];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState<string>("todas");

    const filteredArticles =
        activeCategory === "todas"
            ? BLOG_ARTICULOS
            : BLOG_ARTICULOS.filter(
                (articulo) => articulo.categoria === activeCategory,
            );

    return (
        <section id="blog" className="section active">
            <div className="container">
                <h2 className="section-title">Blog</h2>
                <p className="section-subtitle">
                    Recetas, tips, historias y eventos para seguir endulzando tu día.
                </p>

                {/* Botones de filtro */}
                <div className="filters blog-filters">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            className={
                                "filter-btn" + (activeCategory === cat.id ? " active" : "")
                            }
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Listado de artículos */}
                <div className="blog-grid">
                    {filteredArticles.map((articulo) => (
                        <BlogCard key={articulo.id} articulo={articulo} />
                    ))}

                    {filteredArticles.length === 0 && (
                        <p className="empty-message">
                            No hay artículos para esta categoría todavía. Vuelve pronto 😊
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
