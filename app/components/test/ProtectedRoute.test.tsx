import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router";
import ProtectedRoute from "../layout/ProtectedRoute";
import * as AuthContext from "~/services/auth-context";

// Mock parcial del módulo
vi.mock("~/services/auth-context", async () => {
    const actual = await vi.importActual("~/services/auth-context");
    return {
        ...actual,
        useAuth: vi.fn(),
    };
});

describe("ProtectedRoute Component", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("Muestra spinner de carga cuando isLoading es true", () => {
        // @ts-ignore
        AuthContext.useAuth.mockReturnValue({
            isLoading: true,
            usuarioActual: null
        });

        render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Contenido Protegido</div>
                </ProtectedRoute>
            </MemoryRouter>
        );

        expect(screen.getByText(/cargando sesión/i)).toBeInTheDocument();
    });

    it("Redirige al login si no hay usuario autenticado", () => {
        // @ts-ignore
        AuthContext.useAuth.mockReturnValue({
            isLoading: false,
            usuarioActual: null
        });

        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <Routes>
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <h1>Dashboard Secreto</h1>
                        </ProtectedRoute>
                    } />
                    <Route path="/login" element={<h1>Página de Login</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Página de Login")).toBeInTheDocument();
        expect(screen.queryByText("Dashboard Secreto")).not.toBeInTheDocument();
    });

    it("Renderiza el contenido protegido si el usuario está autenticado", () => {
        // @ts-ignore
        AuthContext.useAuth.mockReturnValue({
            isLoading: false,
            usuarioActual: { id: 1, email: "user@test.com" }
        });

        render(
            <MemoryRouter>
                <ProtectedRoute>
                    <h1>Bienvenido Usuario</h1>
                </ProtectedRoute>
            </MemoryRouter>
        );

        expect(screen.getByText("Bienvenido Usuario")).toBeInTheDocument();
    });
});