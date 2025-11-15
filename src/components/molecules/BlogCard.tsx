import React from 'react';

// Define el tipo para el objeto 'articulo'
type Articulo = {
    id: number;
    titulo: string;
    categoria: string;
    contenido: string;
    fecha: string;
    autor: string;
    imagen: string;
};

// Funciones de ayuda (las tomamos de utils.js)
function truncarTexto(texto: string, limite: number) {
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite) + '...';
}

function capitalizarPalabra(palabra: string) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}

function formatearFecha(fechaStr: string) {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Exporta el componente BlogCard
export const BlogCard = ({ articulo }: { articulo: Articulo }) => {
    return (
        <article className="blog-card">
            <div className="blog-image">
                <span className="blog-emoji">{articulo.imagen}</span>
                <div className="blog-category">{capitalizarPalabra(articulo.categoria)}</div>
            </div>
            <div className="blog-content">
                <h3 className="blog-title">{articulo.titulo}</h3>
                <p className="blog-excerpt">{truncarTexto(articulo.contenido, 120)}</p>
                <div className="blog-meta">
                    <span className="blog-author">
                        <i className="fas fa-user"></i> {articulo.autor}
                    </span>
                    <span className="blog-date">
                        <i className="fas fa-calendar"></i> {formatearFecha(articulo.fecha)}
                    </span>
                </div>
                <button className="btn-primary">
                    <i className="fas fa-book-open"></i> Leer más
                </button>
            </div>
        </article>
    );
};