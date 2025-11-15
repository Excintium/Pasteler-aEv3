import type { Route } from "./+types/blog";
import { BLOG_ARTICULOS } from "~/data/blog";
import { BlogCard } from "~/components/molecules/BlogCard";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Blog - Pastelería Mil Sabores" }];
}

export default function Blog() {
    return (
        <section id="blog" className="section active">
            <div className="container">
                <h2 className="section-title">Blog Mil Sabores</h2>
                <p className="section-subtitle">
                    Descubre tips, recetas y secretos de la repostería
                </p>

                <div className="blog-categories">
                    <button className="filter-btn active" data-category="all">
                        Todos
                    </button>
                    <button className="filter-btn" data-category="recetas">
                        Recetas
                    </button>
                    <button className="filter-btn" data-category="tips">
                        Tips
                    </button>
                    <button className="filter-btn" data-category="historia">
                        Historia
                    </button>
                    <button className="filter-btn" data-category="eventos">
                        Eventos
                    </button>
                </div>

                <div className="blog-grid" id="blog-grid">
                    {BLOG_ARTICULOS.map((articulo) => (
                        <BlogCard key={articulo.id} articulo={articulo} />
                    ))}
                </div>
            </div>
        </section>
    );
}
