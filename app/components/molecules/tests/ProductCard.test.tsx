import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ProductCard } from "../ProductCard";

/* Este es el primer test, habran anotaciones de todo el código para mayor 
   claridad en el resto de tests, por si falla alguno xd */

// Mockeo de los hooks de los servicios (debe ir antes de importar el componente)
const mockAddToCart = vi.fn(); // Función mock para agregar al carrito
const mockShowNotification = vi.fn(); // Función mock para mostrar notificaciones

vi.mock("~/services/cart-context", () => ({ // Mock del contexto del carrito
  useCart: () => ({ // Mock de la función useCart
    addToCart: mockAddToCart, // Usamos la función mock creada arriba
  }),
}));

vi.mock("~/services/notification-context", () => ({ // Mock del contexto de notificaciones
  useNotification: () => ({ // Mock de la función useNotification
    showNotification: mockShowNotification, // Usamos la función mock creada arriba
  }),
}));

// Mockeo de datos (creación de un producto falso)
const mockProduct = { // Datos falsos para simular un producto en los tests
  codigo: "TEST-001",
  nombre: "Mock de torta",
  categoria: "Tortas",
  precio: 25000,
  descripcion: "Torta para pruebas unitarias",
  imagen: "/img/test.jpg",
};


describe("ProductCard Component", () => {
    it("Renderiza la información del producto correctamente", () => {
        // ARRANGE (Preparar)
        render(<ProductCard product={mockProduct} onView={() => {}} />);

        // ASSERT (Verificar)
        // Verificamos que el título esté visible
        expect(screen.getByText("Mock de torta")).toBeInTheDocument();
        // Verificamos el precio formateado
        expect(screen.getByText(/\$ ?25\.000/i)).toBeInTheDocument(); 
        // Verificamos que la imagen tenga el alt text correcto
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("alt", "Mock de torta");
    });

    it("Llama a addToCart y showNotification al hacer clic en 'Agregar'", async () => {
        // ARRANGE
        const user = userEvent.setup();
        render(<ProductCard product={mockProduct} onView={() => {}} />);

        // ACT (Actuar)
        // Buscamos el botón que dice "Agregar"
        const button = screen.getByRole("button", { name: /agregar/i });
        await user.click(button);

        // ASSERT
        // Verificamos que nuestra función espía addToCart haya sido llamada con el producto correcto
        expect(mockAddToCart).toHaveBeenCalledTimes(1);
        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);

        expect(mockShowNotification).toHaveBeenCalledTimes(1);
        expect(mockShowNotification).toHaveBeenCalledWith(expect.stringContaining(mockProduct.nombre));   
     });
});