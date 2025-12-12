import type { FC } from "react";
import type { BackendProduct } from "~/routes/products";
import { useCart } from "~/services/cart-context";
import { useNotification } from "~/services/notification-context";
import { formatPrice, getProductImageUrl } from "~/utils/formatters";

interface Props {
    product: BackendProduct;
    onView: (product: BackendProduct) => void;
}

export const ProductCard: FC<Props> = ({ product, onView }) => {
    const { addToCart } = useCart();
    // Consumimos el contexto de notificación optimizado
    const { showNotification } = useNotification();

    const handleAddToCart = (e: React.MouseEvent) => {
        // Evitamos que el evento se propague si la tarjeta tiene un onClick global
        e.stopPropagation();

        addToCart(product);
        // Feedback inmediato al usuario
        showNotification(`¡${product.nombre} agregado al carrito! 🍰`);
    };

    const imageUrl = getProductImageUrl(product.imagen);

    return (
        <article className="product-card">
            <div className="product-image-header">
                <span className="category-badge">{product.categoria}</span>
                <img
                    src={imageUrl}
                    alt={product.nombre}
                    className="product-image"
                    loading="lazy" // Optimización de performance
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Sin+Imagen";
                    }}
                />
            </div>

            <div className="product-content">
                <h3 className="product-title">{product.nombre}</h3>
                <p className="product-description" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {product.descripcion}
                </p>

                <div className="product-price-row">{formatPrice(product.precio)}</div>

                <div className="product-actions">
                    <button
                        className="btn-add-cart"
                        onClick={handleAddToCart}
                        aria-label={`Agregar ${product.nombre} al carrito`}
                    >
                        <i className="fas fa-shopping-cart" /> Agregar
                    </button>

                    <button
                        className="btn-view-product"
                        title="Ver detalles"
                        onClick={() => onView(product)}
                    >
                        <i className="fas fa-eye" />
                    </button>
                </div>
            </div>
        </article>
    );
};