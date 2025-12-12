import type { FC } from "react";
import type { Articulo } from "~/data/blog";
import { Link } from "react-router";

// Funciones de ayuda
function truncarTexto(texto: string, limite: number) {
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite) + "...";
}

function capitalizarPalabra(palabra: string) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}

function formatearFecha(fechaStr: string) {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString("es-CL", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

interface Props {
    articulo: Articulo;
}

export const BlogCard: FC<Props> = ({ articulo }) => {
    return (
        <article className="blog-card">
            <div className="blog-image">
                {/* Si imagen es emoji */}
                <span className="blog-emoji">{articulo.imagen}</span>
                <div className="blog-category">
                    {capitalizarPalabra(articulo.categoria)}
                </div>
            </div>

            <div className="blog-content">
                <h3 className="blog-title">{articulo.titulo}</h3>
                <p className="blog-excerpt">
                    {truncarTexto(articulo.contenido, 120)}
                </p>

                <div className="blog-meta">
                    <span className="blog-author">
                        <i className="fas fa-user" /> {articulo.autor}
                    </span>
                    <span className="blog-date">
                        <i className="fas fa-calendar" /> {formatearFecha(articulo.fecha)}
                    </span>
                </div>

                {/* 2. Reemplazamos <button> por <Link> */}
                {/* marginTop: 'auto' empuja el botón al final si la tarjeta crece */}
                <Link
                    to={`/blog/${articulo.id}`}
                    className="btn-primary"
                    style={{ marginTop: 'auto', textAlign: 'center', textDecoration: 'none' }}
                >
                    <i className="fas fa-book-open" /> Leer más
                </Link>
            </div>
        </article>
    );
};