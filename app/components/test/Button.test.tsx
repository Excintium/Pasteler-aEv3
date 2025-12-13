import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../atoms/Button";

describe("Button Component", () => {
    it("Renderiza el children correctamente", () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
    });

    it("Ejecuta el evento onClick", async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<Button onClick={handleClick}>Acción</Button>);

        await user.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});