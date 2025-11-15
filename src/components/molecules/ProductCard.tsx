import React from 'react';

function formatearPrecio(precio: number) {
    return `$${precio.toLocaleString('es-CL')}`;
}

type Producto = {
    codigo: string;
    imagen: string;
    nombre: string;
    categoria: string;
    descripcion: string;
    precio: number;
};

export const ProductCard = ({ producto }: { producto: Producto }) => {
    return (
        <div className="product-card" data-code={producto.codigo}>
            <div className="product-image">
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="product-img"
                    loading="lazy"
                />
                <div className="product-category">{producto.categoria}</div>
            </div>
            <div className="product-info">
                <h4 className="product-name">{producto.nombre}</h4>
                <p className="product-description">{producto.descripcion}</p>
                <div className="product-price">{formatearPrecio(producto.precio)}</div>
                <div className="product-actions">
                    <button className="btn-add-cart">
                        <i className="fas fa-shopping-cart"></i> Agregar
                    </button>
                    <button className="btn-view-product">
                        <i className="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};