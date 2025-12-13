import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router";
import { BlogCard } from "../molecules/BlogCard";

describe("BlogCard Component", () => {
    const mockArticulo = {
        id: 10,
        titulo: "Receta de Pastel",
        categoria: "recetas",
        contenido: "Este es el mejor pastel del mundo...",
        fecha: "2023-10-10",
        autor: "Chef Juan",
        imagen: "🍰"
    };

    it("Renderiza correctamente la información del artículo", () => {
        render(
            <MemoryRouter>
                <BlogCard articulo={mockArticulo} />
            </MemoryRouter>
        );

        expect(screen.getByText("Receta de Pastel")).toBeInTheDocument();
        expect(screen.getByText("Chef Juan")).toBeInTheDocument();
        expect(screen.getByText("🍰")).toBeInTheDocument();
    });

    it("Genera el enlace correcto al detalle", () => {
        render(
            <MemoryRouter>
                <BlogCard articulo={mockArticulo} />
            </MemoryRouter>
        );
        const link = screen.getByRole("link", { name: /leer más/i });
        expect(link).toHaveAttribute("href", "/blog/10");
    });
});