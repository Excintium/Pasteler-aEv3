import { useState } from "react";
import type { Route } from "./+types/cart";
import { useCart } from "~/services/cart-context";
import { useAuth } from "~/services/auth-context"; // Importamos Auth
import { Link, useNavigate } from "react-router";
import { useNotification } from "~/services/notification-context";
import { getProductImageUrl } from "~/utils/formatters";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Carrito - Pastelería Mil Sabores" }];
}

// Interfaz para la data de la boleta
interface BoletaData {
    fecha: string;
    items: ReturnType<typeof useCart>['items'];
    subtotal: number;
    descuento: number;
    total: number;
    cliente: string;
    esMayor: boolean;
}

export default function CartPage() {
    // Obtenemos funciones del carrito, incluyendo la nueva decreaseQuantity
    const { items, totalItems, subtotalPrice, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();
    const { usuarioActual } = useAuth(); // Obtenemos el usuario para verificar rol
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    // Estado para controlar la visibilidad del modal de boleta
    const [showBoleta, setShowBoleta] = useState(false);
    const [boletaData, setBoletaData] = useState<BoletaData | null>(null);

    // Lógica de Negocio: Descuentos
    const esAdultoMayor = usuarioActual?.tipoUsuario === "mayor";
    const porcentajeDescuento = esAdultoMayor ? 0.50 : 0; // 50%
    const montoDescuento = subtotalPrice * porcentajeDescuento;
    const totalFinal = subtotalPrice - montoDescuento;

    const handleProcesarCompra = () => {
        if (items.length === 0) return;

        // Preparamos los datos snapshot para la boleta
        setBoletaData({
            fecha: new Date().toLocaleString("es-CL"),
            items: [...items],
            subtotal: subtotalPrice,
            descuento: montoDescuento,
            total: totalFinal,
            cliente: usuarioActual?.nombre || "Cliente General",
            esMayor: esAdultoMayor
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
                    <Link to="/products" className="btn-primary">
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

                {/* Banner informativo de descuento si aplica */}
                {esAdultoMayor && (
                    <div style={{
                        backgroundColor: '#d4edda', color: '#155724', padding: '1rem',
                        borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #c3e6cb',
                        display: 'flex', alignItems: 'center', gap: '10px'
                    }}>
                        <i className="fas fa-percent"></i>
                        <strong>¡Felicidades!</strong> Se está aplicando un 50% de descuento por ser Adulto Mayor.
                    </div>
                )}

                <div className="cart-container">
                    {/* Lista de Items */}
                    <div className="cart-items">
                        {items.map((item) => (
                            <article key={item.codigo} className="cart-item">
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

                                    <div className="cart-item-controls" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                        {/* Controles de cantidad */}
                                        <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px' }}>
                                            <button
                                                onClick={() => decreaseQuantity(item.codigo)}
                                                style={{ padding: '5px 10px', background: '#f8f9fa', border: 'none', cursor: 'pointer', borderRight: '1px solid #ddd' }}
                                                aria-label="Disminuir cantidad"
                                            >
                                                <i className="fas fa-minus" style={{ fontSize: '0.8rem' }}></i>
                                            </button>
                                            <span style={{ padding: '5px 12px', fontWeight: 'bold' }}>{item.quantity}</span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                style={{ padding: '5px 10px', background: '#f8f9fa', border: 'none', cursor: 'pointer', borderLeft: '1px solid #ddd' }}
                                                aria-label="Aumentar cantidad"
                                            >
                                                <i className="fas fa-plus" style={{ fontSize: '0.8rem' }}></i>
                                            </button>
                                        </div>

                                        <span className="cart-item-price" style={{ fontWeight: 'bold', color: 'var(--color-chocolate)' }}>
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
                            <span>Subtotal ({totalItems} prod.)</span>
                            <span>${subtotalPrice.toLocaleString("es-CL")}</span>
                        </div>

                        {esAdultoMayor && (
                            <div className="summary-line" style={{ color: '#28a745' }}>
                                <span>Desc. Adulto Mayor (50%)</span>
                                <span>-${montoDescuento.toLocaleString("es-CL")}</span>
                            </div>
                        )}

                        <div className="summary-line">
                            <span>Envío</span>
                            <span style={{ color: 'green', fontWeight: 'bold' }}>Gratis</span>
                        </div>

                        <div className="summary-line total" style={{ borderTop: '2px solid #eee', paddingTop: '10px', marginTop: '10px' }}>
                            <span>Total a Pagar</span>
                            <span>${totalFinal.toLocaleString("es-CL")}</span>
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

            {/* MODAL DE BOLETA */}
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
                            <p>Cliente: {boletaData.cliente}</p>
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

                        <div className="boleta-totales" style={{ textAlign: 'right', marginBottom: '2rem' }}>
                            <p style={{ margin: '5px 0' }}>Subtotal: ${boletaData.subtotal.toLocaleString("es-CL")}</p>

                            {boletaData.esMayor && (
                                <p style={{ margin: '5px 0', color: '#28a745' }}>
                                    Desc. A. Mayor: -${boletaData.descuento.toLocaleString("es-CL")}
                                </p>
                            )}

                            <p style={{ fontSize: '1.4rem', fontWeight: 'bold', marginTop: '10px', borderTop: '1px dashed #333', paddingTop: '10px' }}>
                                TOTAL: ${boletaData.total.toLocaleString("es-CL")}
                            </p>
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