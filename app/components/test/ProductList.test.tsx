import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductList from "../organisms/ProductList";
import { PRODUCTOS } from "~/data/products";

// Mock de ProductCard para aislar el test
vi.mock("~/components/molecules/ProductCard", () => ({
    ProductCard: ({ producto }: any) => (
        <div data-testid="product-card">
            {producto.nombre}
        </div>
    ),
}));

describe("Página Productos", () => {

    it("renderiza el título principal", () => {
        render(<ProductList />);
        expect(
            screen.getByRole("heading", { name: /nuestros productos/i })
        ).toBeInTheDocument();
    });

    it("renderiza el input de búsqueda", () => {
        render(<ProductList />);
        expect(
            screen.getByPlaceholderText("🔍 Buscar productos...")
        ).toBeInTheDocument();
    });

    it("renderiza todos los botones de filtro", () => {
        render(<ProductList />);

        const filtros = [
            "Todos",
            "Tortas Cuadradas",
            "Tortas Circulares",
            "Postres",
            "Sin Azúcar",
            "Tradicional",
            "Sin Gluten",
            "Vegana",
            "Especiales",
        ];

        filtros.forEach(filtro => {
            expect(
                screen.getByRole("button", { name: filtro })
            ).toBeInTheDocument();
        });
    });

    it("renderiza una ProductCard por cada producto", () => {
        render(<ProductList />);

        const cards = screen.getAllByTestId("product-card");
        expect(cards.length).toBe(PRODUCTOS.length);
    });

});
