import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ProductModal } from "../organisms/ProductModal";

const mockAddToCart = vi.fn();
vi.mock("~/services/cart-context", () => ({
    useCart: () => ({ addToCart: mockAddToCart }),
}));

const mockProduct = {
    id: 99,
    codigo: "TEST-MODAL",
    nombre: "Torta Modal",
    categoria: "Especial",
    precio: 9990,
    descripcion: "Descripción detallada",
    imagen: "modal.jpg",
    destacado: false
};

describe("ProductModal Component", () => {
    it("No renderiza nada si isOpen es false", () => {
        const { container } = render(
            <ProductModal isOpen={false} product={mockProduct} onClose={vi.fn()} />
        );
        expect(container).toBeEmptyDOMElement();
    });

    it("Renderiza el contenido si isOpen es true", () => {
        render(<ProductModal isOpen={true} product={mockProduct} onClose={vi.fn()} />);
        expect(screen.getByText("Torta Modal")).toBeInTheDocument();
        expect(screen.getByText("Descripción detallada")).toBeInTheDocument();
    });

    it("Llama a onClose al hacer click en el botón cerrar", async () => {
        const handleClose = vi.fn();
        const user = userEvent.setup();

        render(<ProductModal isOpen={true} product={mockProduct} onClose={handleClose} />);

        // Asumiendo que el botón de cerrar es un botón sin texto pero con icono o clase específica
        // Buscamos por el elemento button
        const buttons = screen.getAllByRole("button");
        const closeBtn = buttons[0]; // Usualmente el primero es la X

        await user.click(closeBtn);
        expect(handleClose).toHaveBeenCalled();
    });

    it("Agrega al carrito desde el modal", async () => {
        const user = userEvent.setup();
        render(<ProductModal isOpen={true} product={mockProduct} onClose={vi.fn()} />);

        const addBtn = screen.getByRole("button", { name: /agregar al carrito/i });
        await user.click(addBtn);

        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    });
});