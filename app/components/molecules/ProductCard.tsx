import type { FC } from "react";
import type { Producto } from "~/data/products";
import { useCart } from "~/services/cart-context";
import { useNotification } from "~/services/notification-context";

interface Props {
    product: Producto;
    onView: (product: Producto) => void;
}

export const ProductCard: FC<Props> = ({ product, onView }) => {
    const { addToCart } = useCart();
    const { showNotification } = useNotification();

    const handleAddToCart = () => {
        addToCart(product);
        showNotification(`¡${product.nombre} agregado al carrito! 🍰`);
    };

    const formatearPrecio = (precio: number) => {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
        }).format(precio);
    };

    return (
        <article className="product-card">
            <div className="product-image-header">
                <span className="category-badge">{product.categoria}</span>
                <img src={product.imagen} alt={product.nombre} className="product-image" />
            </div>

            <div className="product-content">
                <h3 className="product-title">{product.nombre}</h3>
                <p className="product-description">{product.descripcion}</p>
                <div className="product-price-row">{formatearPrecio(product.precio)}</div>

                <div className="product-actions">
                    <button className="btn-add-cart" onClick={handleAddToCart}>
                        <i className="fas fa-shopping-cart" /> Agregar
                    </button>
                    
                    <button className="btn-view-product" title="Ver detalles" onClick={() => onView(product)}>
                        <i className="fas fa-eye" />
                    </button>
                </div>
            </div>
        </article>
    );
};