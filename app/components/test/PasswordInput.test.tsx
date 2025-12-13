import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PasswordInput } from "../atoms/PasswordInput";

describe("PasswordInput Component", () => {
    it("Tiene el atributo type='password'", () => {
        render(<PasswordInput placeholder="Contraseña secreta" />);
        const input = screen.getByPlaceholderText("Contraseña secreta");
        expect(input).toHaveAttribute("type", "password");
    });
});