import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ProductCard } from "../molecules/ProductCard";

// Mock Contexts
const mockAddToCart = vi.fn();
const mockShowNotification = vi.fn();

vi.mock("~/services/cart-context", () => ({
    useCart: () => ({ addToCart: mockAddToCart }),
}));

vi.mock("~/services/notification-context", () => ({
    useNotification: () => ({ showNotification: mockShowNotification }),
}));

const mockProduct = {
    id: 1,
    codigo: "P-001",
    nombre: "Torta de Chocolate",
    categoria: "Tortas",
    precio: 25000,
    descripcion: "Deliciosa torta",
    imagen: "img.jpg",
    destacado: true
};

describe("ProductCard Component", () => {
    it("Renderiza precio y nombre", () => {
        render(<ProductCard product={mockProduct} onView={vi.fn()} />);
        expect(screen.getByText("Torta de Chocolate")).toBeInTheDocument();
        // El precio formateado suele contener el símbolo $
        expect(screen.getByText(/\$ ?25\.000/)).toBeInTheDocument();
    });

    it("Agrega al carrito al hacer click en el botón", async () => {
        const user = userEvent.setup();
        render(<ProductCard product={mockProduct} onView={vi.fn()} />);

        const btnAdd = screen.getByRole("button", { name: /agregar/i });
        await user.click(btnAdd);

        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
        expect(mockShowNotification).toHaveBeenCalled();
    });

    it("Llama a onView al hacer click en el botón de ver", async () => {
        const user = userEvent.setup();
        const handleView = vi.fn();
        render(<ProductCard product={mockProduct} onView={handleView} />);

        const btnView = screen.getByTitle("Ver detalles");
        await user.click(btnView);

        expect(handleView).toHaveBeenCalledWith(mockProduct);
    });
});