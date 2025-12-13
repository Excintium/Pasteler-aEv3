import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UserProfile } from "../molecules/UserProfile";
import { MemoryRouter } from "react-router";
import * as AuthContext from "~/services/auth-context";

vi.mock("~/services/auth-context", () => ({
    useAuth: vi.fn(),
}));

describe("UserProfile Component", () => {
    it("No renderiza nada si no hay usuario", () => {
        // @ts-ignore
        AuthContext.useAuth.mockReturnValue({ usuarioActual: null });
        const { container } = render(<UserProfile />, { wrapper: MemoryRouter });
        expect(container).toBeEmptyDOMElement();
    });

    it("Muestra el email y el rol correctamente", () => {
        // @ts-ignore
        AuthContext.useAuth.mockReturnValue({
            usuarioActual: { email: "admin@mil.cl", tipoUsuario: "admin" },
            logout: vi.fn()
        });

        render(<UserProfile />, { wrapper: MemoryRouter });
        expect(screen.getByText("admin@mil.cl")).toBeInTheDocument();
        expect(screen.getByText("Administrador")).toBeInTheDocument();
    });

    it("Llama a logout al presionar Salir", () => {
        const mockLogout = vi.fn();
        // @ts-ignore
        AuthContext.useAuth.mockReturnValue({
            usuarioActual: { email: "cliente@mil.cl", tipoUsuario: "regular" },
            logout: mockLogout
        });

        render(<UserProfile />, { wrapper: MemoryRouter });
        const btn = screen.getByText("Salir");
        fireEvent.click(btn);
        expect(mockLogout).toHaveBeenCalled();
    });
});