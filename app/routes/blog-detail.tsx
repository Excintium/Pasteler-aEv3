import type { Route } from "./+types/blog-detail";
import { useParams, Link } from "react-router";
import { BLOG_ARTICULOS } from "~/data/blog";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Artículo - Pastelería Mil Sabores" }];
}

export default function BlogDetail() {
    const { id } = useParams();
    const articulo = BLOG_ARTICULOS.find(a => a.id === Number(id));

    if (!articulo) {
        return (
            <div className="container section active" style={{textAlign: 'center', padding: '4rem 0'}}>
                <h2>Artículo no encontrado 😢</h2>
                <Link to="/blog" className="btn-primary" style={{marginTop: '1rem'}}>Volver al Blog</Link>
            </div>
        );
    }

    return (
        <section className="section active">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Link to="/blog" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <i className="fas fa-arrow-left"></i> Volver al Blog
                    </Link>
                </div>

                <div className="blog-card" style={{ padding: '0', overflow: 'hidden', border: 'none', boxShadow: 'none' }}>
                    <div style={{ background: 'var(--color-rosa-suave)', padding: '3rem', fontSize: '5rem', textAlign: 'center', borderRadius: '20px' }}>
                        {articulo.imagen}
                    </div>

                    <div style={{ padding: '2rem 0' }}>
                        <span className="badge" style={{
                            background: 'var(--color-dorado)',
                            padding: '5px 12px',
                            borderRadius: '15px',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            color: 'var(--color-chocolate)'
                        }}>
                            {articulo.categoria.toUpperCase()}
                        </span>

                        <h1 className="section-title" style={{ textAlign: 'left', marginTop: '1rem', fontSize: '2.5rem' }}>{articulo.titulo}</h1>

                        <div className="blog-meta" style={{ marginBottom: '2rem', justifyContent: 'flex-start', gap: '2rem', borderTop: 'none' }}>
                            <span><i className="fas fa-user"></i> {articulo.autor}</span>
                            <span><i className="fas fa-calendar"></i> {articulo.fecha}</span>
                        </div>

                        <div className="blog-body" style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#444' }}>
                            <p style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>{articulo.contenido}</p>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                            <h3 style={{ color: 'var(--color-chocolate)', marginTop: '2rem' }}>Ingredientes secretos</h3>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}