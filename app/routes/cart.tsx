// app/routes/cart.tsx
import type { Route } from "./+types/cart";
import { useCart } from "~/services/cart-context";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Carrito - Pastelería Mil Sabores" }];
}

export default function CartPage() {
    const { items, totalItems, totalPrice, removeFromCart, clearCart } = useCart();

    if (totalItems === 0) {
        return (
            <section id="carrito" className="section active">
                <div className="container">
                    <h2 className="section-title">Tu carrito está vacío</h2>
                    <p>Agrega algunas tortas deliciosas desde el catálogo 🧁.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="carrito" className="section active">
            <div className="container">
                <h2 className="section-title">Tu carrito</h2>

                <div className="cart-grid">
                    {items.map((item) => (
                        <article key={item.codigo} className="cart-item">
                            <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="cart-item-image"
                            />

                            <div className="cart-item-info">
                                <h3>{item.nombre}</h3>
                                <p>{item.descripcion}</p>
                                <p>Cantidad: {item.quantity}</p>
                                <p>Precio unidad: ${item.precio}</p>
                                <p>Subtotal: ${item.precio * item.quantity}</p>

                                <button
                                    className="btn-secondary"
                                    onClick={() => removeFromCart(item.codigo)}
                                >
                                    Quitar
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="cart-summary">
                    <p>Total productos: {totalItems}</p>
                    <p>Total a pagar: ${totalPrice}</p>
                    <button className="btn-primary" onClick={clearCart}>
                        Vaciar carrito
                    </button>
                </div>
            </div>
        </section>
    );
}
