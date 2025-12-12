import { useEffect, type FC } from "react";
import { useCart } from "~/services/cart-context";
import { formatPrice, getProductImageUrl } from "~/utils/formatters"; // Importamos las utilidades

/**
 * INTERFAZ: Product
 * Define la estructura de datos que viene de tu Backend NestJS.
 */
interface Product {
    id: number;
    codigo: string;
    nombre: string;
    categoria: string;
    precio: number;
    descripcion: string;
    imagen: string;
    destacado?: boolean;
}

interface Props {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

/**
 * COMPONENTE: ProductModal
 * Muestra el detalle del producto usando los estilos de 'app.css'.
 */
export const ProductModal: FC<Props> = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();

    // Effect: Cerrar modal con la tecla ESC (Mejora de experiencia de usuario)
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    // Si no debe mostrarse, no renderizamos nada
    if (!isOpen || !product) return null;

    // LÓGICA DE BACKEND: Procesamos la URL de la imagen
    const imageUrl = getProductImageUrl(product.imagen);

    const handleAddToCart = () => {
        // Adaptamos el producto al formato que espera el carrito si es necesario
        // (Asumiendo que useCart maneja objetos similares, si no, aquí se mapea)
        addToCart(product as any);
        onClose(); // Opcional: cerrar al agregar
    };

    // ESTRUCTURA ORIGINAL (Restaurada para funcionar con app.css)
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>

                {/* Botón Cerrar */}
                <button className="modal-close-btn" onClick={onClose}>
                    <i className="fas fa-times" />
                </button>

                {/* Sección Imagen - Usando la URL procesada del backend */}
                <div className="modal-image-section">
                    <img
                        src={imageUrl}
                        alt={product.nombre}
                        className="modal-product-image"
                        onError={(e) => {
                            // Fallback por si la imagen falla
                            (e.target as HTMLImageElement).src = "https://placehold.co/600x600?text=Sin+Imagen";
                        }}
                    />
                </div>

                {/* Sección Información */}
                <div className="modal-info-section">
                    <span className="modal-category">{product.categoria}</span>
                    <h2 className="modal-title">{product.nombre}</h2>

                    <p className="modal-description">
                        {product.descripcion}
                    </p>

                    {/* Precio formateado con la utilidad */}
                    <div className="modal-price">
                        {formatPrice(product.precio)}
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