import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { Producto } from "~/data/products";

// Nivel de documentación: Semi-senior

export interface CartItem extends Producto {
    quantity: number;
}

interface CartContextValue {
    items: CartItem[];
    totalItems: number;
    subtotalPrice: number; // Renombrado para claridad (es precio sin descuento)
    addToCart: (product: Producto) => void;
    decreaseQuantity: (codigo: string) => void; // Nuevo método
    removeFromCart: (codigo: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

/**
 * Carga el estado inicial del carrito desde localStorage de manera segura.
 */
function loadInitialCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem("cart");
        return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
        console.error("Error al parsear el carrito del storage");
        return [];
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(loadInitialCart);

    // Persistencia en LocalStorage
    useEffect(() => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    /**
     * Agrega un producto o incrementa su cantidad si ya existe.
     */
    const addToCart = (product: Producto) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.codigo === product.codigo);
            if (existing) {
                return prev.map((i) =>
                    i.codigo === product.codigo
                        ? { ...i, quantity: i.quantity + 1 }
                        : i,
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    /**
     * Decrementa la cantidad de un producto.
     * Si la cantidad llega a 0, elimina el producto del carrito.
     */
    const decreaseQuantity = (codigo: string) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.codigo === codigo);
            // Si no existe o la cantidad es 1, lo eliminamos
            if (existing?.quantity === 1) {
                return prev.filter((i) => i.codigo !== codigo);
            }
            // Si es mayor a 1, restamos
            return prev.map((i) =>
                i.codigo === codigo
                    ? { ...i, quantity: i.quantity - 1 }
                    : i
            );
        });
    };

    const removeFromCart = (codigo: string) => {
        setItems((prev) => prev.filter((i) => i.codigo !== codigo));
    };

    const clearCart = () => setItems([]);

    // Cálculos derivados
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

    // Este es el subtotal (suma de precios de lista), sin descuentos aplicados.
    const subtotalPrice = items.reduce(
        (sum, i) => sum + i.quantity * i.precio,
        0,
    );

    return (
        <CartContext.Provider
            value={{
                items,
                totalItems,
                subtotalPrice, // Exponemos como subtotal
                addToCart,
                decreaseQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return ctx;
}