import type { Route } from "./+types/cart";
import { useCart } from "~/services/cart-context";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Carrito - Pastelería Mil Sabores" }];
}

export default function CartPage() {
    const { items, totalItems, totalPrice, removeFromCart, clearCart } = useCart();

    // 1. Diseño mejorado para Carrito Vacío
    if (totalItems === 0) {
        return (
            <section id="carrito" className="section active" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
                <div className="container text-center empty-cart">
                    <div style={{ background: 'var(--color-crema-pastel)', width: '120px', height: '120px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <i className="fas fa-shopping-basket" style={{ fontSize: '4rem', color: 'var(--color-chocolate)', opacity: 0.5 }}></i>
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

    // 2. Diseño de Grid (Items a la izq, Resumen a la der)
    return (
        <section id="carrito" className="section active">
            <div className="container">
                <h2 className="section-title">Tu Carrito de Compras</h2>

                <div className="cart-container">
                    <div className="cart-items">
                        {items.map((item) => (
                            <article key={item.codigo} className="cart-item">
                                <img
                                    src={item.imagen}
                                    alt={item.nombre}
                                    className="cart-item-image"
                                />

                                <div className="cart-item-info">
                                    <h3 className="cart-item-name">{item.nombre}</h3>
                                    <p className="text-muted" style={{ fontSize: '0.9rem', color: '#777', marginBottom: '0.5rem' }}>{item.descripcion.substring(0, 60)}...</p>

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

                    {/* 3. Tarjeta de Resumen (Sticky) */}
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

                        <button className="btn-primary full-width" onClick={() => alert("¡Funcionalidad de pago próximamente!")}>
                            Ir a Pagar
                        </button>

                        <button className="btn-secondary full-width" onClick={clearCart} style={{ marginTop: '10px' }}>
                            Vaciar Carrito
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}