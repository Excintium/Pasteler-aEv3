import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router";
import { AuthPanel } from "../organisms/AuthPanel";

describe("AuthPanel Component", () => {
    it("Muestra formulario de inicio de sesión por defecto", () => {
        render(
            <MemoryRouter>
                <AuthPanel mode="login" />
            </MemoryRouter>
        );
        expect(screen.getByRole("heading", { name: "Iniciar Sesión" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Ingresar" })).toBeInTheDocument();
    });

    it("Muestra formulario de registro cuando el modo es register", () => {
        render(
            <MemoryRouter>
                <AuthPanel mode="register" />
            </MemoryRouter>
        );
        expect(screen.getByRole("heading", { name: "Crear Cuenta" })).toBeInTheDocument();
        expect(screen.getByLabelText("Nombre completo")).toBeInTheDocument();
    });
});