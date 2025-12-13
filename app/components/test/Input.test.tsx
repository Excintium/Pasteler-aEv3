import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Input } from "../atoms/Input";

describe("Input Component", () => {
    it("Renderiza con placeholder y acepta texto", async () => {
        const user = userEvent.setup();
        render(<Input placeholder="Nombre de usuario" />);

        const input = screen.getByPlaceholderText("Nombre de usuario");
        expect(input).toBeInTheDocument();

        await user.type(input, "Juan Perez");
        expect(input).toHaveValue("Juan Perez");
    });
});