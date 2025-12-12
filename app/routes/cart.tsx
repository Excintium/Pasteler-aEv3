import { useState } from "react";
import type { Route } from "./+types/cart";
import { useCart } from "~/services/cart-context";
import { Link, useNavigate } from "react-router";
import { useNotification } from "~/services/notification-context";
import { getProductImageUrl } from "~/utils/formatters"; //

// Nivel de documentación: Semi-senior

export function meta({}: Route.MetaArgs) {
    return [{ title: "Carrito - Pastelería Mil Sabores" }];
}

export default function CartPage() {
    const { items, totalItems, totalPrice, removeFromCart, clearCart } = useCart();
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    // Estado para controlar la visibilidad del modal de boleta
    const [showBoleta, setShowBoleta] = useState(false);
    const [boletaData, setBoletaData] = useState<{ fecha: string; items: typeof items; total: number } | null>(null);

    const handleProcesarCompra = () => {
        if (items.length === 0) return;

        // Preparamos los datos para la boleta antes de mostrarla
        setBoletaData({
            fecha: new Date().toLocaleString("es-CL"),
            items: [...items], // Copia de seguridad de los items actuales
            total: totalPrice,
        });
        setShowBoleta(true);
    };

    const handleCerrarBoleta = () => {
        setShowBoleta(false);
        clearCart();
        showNotification("¡Gracias por tu compra! Tu pedido se está procesando. 🧁");
        navigate("/");
    };

    // Renderizado: Carrito Vacío
    if (totalItems === 0) {
        return (
            <section id="carrito" className="section active" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
                <div className="container text-center empty-cart">
                    <div style={{ background: 'var(--color-crema-pastel, #fdfbf7)', width: '120px', height: '120px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <i className="fas fa-shopping-basket" style={{ fontSize: '4rem', color: 'var(--color-chocolate, #5d4037)', opacity: 0.5 }}></i>
                    </div>
                    <h2 className="section-title">Tu carrito está vacío</h2>
                    <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: '#666' }}>Parece que aún no has elegido ninguna de nuestras delicias.</p>
                    <Link to="/productos" className="btn-primary">
                        <i className="fas fa-store"></i> Ir al Catálogo
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section id="carrito" className="section active">
            <div className="container">
                <h2 className="section-title">Tu Carrito de Compras</h2>

                <div className="cart-container">
                    {/* Lista de Items */}
                    <div className="cart-items">
                        {items.map((item) => (
                            <article key={item.codigo} className="cart-item">
                                {/* CORRECCIÓN: Uso de getProductImageUrl para cargar la imagen correctamente */}
                                <img
                                    src={getProductImageUrl(item.imagen)}
                                    alt={item.nombre}
                                    className="cart-item-image"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=Sin+Foto";
                                    }}
                                />

                                <div className="cart-item-info">
                                    <h3 className="cart-item-name">{item.nombre}</h3>
                                    <p className="text-muted" style={{ fontSize: '0.9rem', color: '#777', marginBottom: '0.5rem' }}>
                                        {item.descripcion.substring(0, 60)}...
                                    </p>

                                    <div className="cart-item-controls">
                                        <span className="quantity-display">Cant: {item.quantity}</span>
                                        <span className="cart-item-price" style={{ marginLeft: '1rem', fontWeight: 'bold', color: 'var(--color-chocolate)' }}>
                                            ${(item.precio * item.quantity).toLocaleString("es-CL")}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    className="remove-item"
                                    onClick={() => removeFromCart(item.codigo)}
                                    title="Eliminar producto"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </article>
                        ))}
                    </div>

                    {/* Resumen del Pedido */}
                    <div className="cart-summary summary-card">
                        <h3>Resumen del Pedido</h3>
                        <div className="summary-line">
                            <span>Productos ({totalItems})</span>
                            <span>${totalPrice.toLocaleString("es-CL")}</span>
                        </div>
                        <div className="summary-line">
                            <span>Envío</span>
                            <span style={{ color: 'green', fontWeight: 'bold' }}>Gratis</span>
                        </div>
                        <div className="summary-line total">
                            <span>Total</span>
                            <span>${totalPrice.toLocaleString("es-CL")}</span>
                        </div>

                        <button
                            className="btn-primary full-width"
                            onClick={handleProcesarCompra}
                        >
                            Ir a Pagar
                        </button>

                        <button
                            className="btn-secondary full-width"
                            onClick={clearCart}
                            style={{ marginTop: '10px' }}
                        >
                            Vaciar Carrito
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL DE BOLETA (Estilo PokeStore adaptado) */}
            {showBoleta && boletaData && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="boleta-modal" style={{
                        backgroundColor: '#fff', padding: '2rem', borderRadius: '10px',
                        maxWidth: '450px', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        maxHeight: '90vh', overflowY: 'auto', fontFamily: "'Courier New', Courier, monospace"
                    }}>
                        <div className="text-center mb-4">
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', borderBottom: '2px dashed #333', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                PASTELERÍA MIL SABORES
                            </h2>
                            <p>RUT: 76.123.456-7</p>
                            <p>Av. Siempre Viva 742, Santiago</p>
                            <p>Tel: +56 2 2345 6789</p>
                            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{boletaData.fecha}</p>
                        </div>

                        <div className="boleta-items" style={{ marginBottom: '1.5rem', borderBottom: '1px dashed #ccc', paddingBottom: '1rem' }}>
                            <table style={{ width: '100%', fontSize: '0.9rem' }}>
                                <thead>
                                <tr style={{ textAlign: 'left' }}>
                                    <th>Cant.</th>
                                    <th>Producto</th>
                                    <th style={{ textAlign: 'right' }}>Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {boletaData.items.map((item) => (
                                    <tr key={item.codigo}>
                                        <td>{item.quantity}</td>
                                        <td>{item.nombre}</td>
                                        <td style={{ textAlign: 'right' }}>${(item.precio * item.quantity).toLocaleString("es-CL")}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="boleta-total" style={{ textAlign: 'right', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
                            <p>TOTAL: ${boletaData.total.toLocaleString("es-CL")}</p>
                        </div>

                        <div className="text-center" style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                            <p>¡Gracias por su preferencia!</p>
                            <p>Conserve este ticket como comprobante.</p>
                        </div>

                        <div className="modal-actions" style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                            <button
                                className="btn-primary"
                                onClick={() => window.print()}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            >
                                <i className="fas fa-print"></i> Imprimir Comprobante
                            </button>
                            <button
                                className="btn-secondary"
                                onClick={handleCerrarBoleta}
                            >
                                Cerrar y Finalizar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}