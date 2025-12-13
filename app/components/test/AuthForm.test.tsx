import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";
import { AuthForm } from "../molecules/AuthForm";

// Mocks
const mockLogin = vi.fn();
const mockRegister = vi.fn();

vi.mock("~/services/auth-context", () => ({
    useAuth: () => ({
        login: mockLogin,
        register: mockRegister,
        error: null,
        isLoading: false,
    }),
}));

// Mock de navegación para evitar errores de router fuera de contexto
vi.mock("react-router", async (importOriginal) => {
    const actual = await importOriginal<any>();
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

describe("AuthForm Component", () => {
    beforeEach(() => vi.clearAllMocks());

    it("Llama a la función login al enviar formulario en modo Login", async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter>
                <AuthForm mode="login" />
            </MemoryRouter>
        );

        await user.type(screen.getByLabelText(/correo/i), "test@test.com");
        await user.type(screen.getByLabelText(/contraseña/i), "123456");

        await user.click(screen.getByRole("button", { name: /entrar/i }));

        expect(mockLogin).toHaveBeenCalledWith("test@test.com", "123456");
    });

    it("Muestra campos extra en modo Registro", () => {
        render(
            <MemoryRouter>
                <AuthForm mode="register" />
            </MemoryRouter>
        );
        expect(screen.getByText(/nombre completo/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /registrarme/i })).toBeInTheDocument();
    });
});