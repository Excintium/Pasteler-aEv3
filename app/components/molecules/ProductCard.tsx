// app/components/molecules/ProductCard.tsx
import type { FC } from "react";
import type { Producto } from "app/data/products";
import { useCart } from "app/services/cart-context";

interface Props {
    product: Producto;
}

export const ProductCard: FC<Props> = ({ product }) => {
    const { addToCart } = useCart();
    const imageSrc = product.imagen;

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <article className="product-card">
            <img src={imageSrc} alt={product.nombre} className="product-image" />
            <h3>{product.nombre}</h3>
            <p>{product.descripcion}</p>
            <span className="product-price">${product.precio}</span>
            <button
                className="btn-primary product-add-btn"
                onClick={handleAddToCart}
            >
                <i className="fas fa-cart-plus" /> Agregar al carrito
            </button>
        </article>
    );
};
