import type { FC } from "react";
import type { BackendProduct } from "~/routes/products"; // Importamos la interfaz correcta
import { useCart } from "~/services/cart-context";
import { useNotification } from "~/services/notification-context";
import { formatPrice, getProductImageUrl } from "~/utils/formatters"; // Usamos nuestras utilidades

interface Props {
    product: BackendProduct; // Cambiamos el tipo a BackendProduct
    onView: (product: BackendProduct) => void;
}

export const ProductCard: FC<Props> = ({ product, onView }) => {
    const { addToCart } = useCart();
    const { showNotification } = useNotification();

    const handleAddToCart = () => {
        addToCart(product);
        showNotification(`¡${product.nombre} agregado al carrito! 🍰`);
    };

    // Procesamos la URL de la imagen
    const imageUrl = getProductImageUrl(product.imagen);

    return (
        <article className="product-card">
            <div className="product-image-header">
                <span className="category-badge">{product.categoria}</span>
                {/* Usamos la URL procesada */}
                <img
                    src={imageUrl}
                    alt={product.nombre}
                    className="product-image"
                    onError={(e) => {
                        // Fallback si la imagen no carga
                        (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Sin+Imagen";
                    }}
                />
            </div>

            <div className="product-content">
                <h3 className="product-title">{product.nombre}</h3>
                {/* Limitamos la descripción visualmente si es muy larga */}
                <p className="product-description" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {product.descripcion}
                </p>

                {/* Usamos el formateador centralizado */}
                <div className="product-price-row">{formatPrice(product.precio)}</div>

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