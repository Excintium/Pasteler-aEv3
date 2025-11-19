import type { FC } from "react";
import type { Producto } from "~/data/products";
import { useCart } from "~/services/cart-context";

interface Props {
    product: Producto | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ProductModal: FC<Props> = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();

    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        addToCart(product);

    };

    const formatearPrecio = (precio: number) => {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
        }).format(precio);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <i className="fas fa-times" />
                </button>

                <div className="modal-image-section">
                    <img 
                        src={product.imagen} 
                        alt={product.nombre} 
                        className="modal-product-image" 
                    />
                </div>

                <div className="modal-info-section">
                    <span className="modal-category">{product.categoria}</span>
                    <h2 className="modal-title">{product.nombre}</h2>
                    
                    <p className="modal-description">
                        {product.descripcion}
                    </p>

                    <div className="modal-price">
                        {formatearPrecio(product.precio)}
                    </div>

                    <button 
                        className="btn-primary modal-add-btn"
                        onClick={handleAddToCart}
                    >
                        <i className="fas fa-shopping-cart" /> Agregar al Carrito
                    </button>

                    <div className="modal-footer-code">
                        Código: {product.codigo}
                    </div>
                </div>
            </div>
        </div>
    );
};