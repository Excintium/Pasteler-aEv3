// app/routes/register.tsx
import type { Route } from "./+types/register";
import { AuthPanel } from "../../src/components/organisms/AuthPanel";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Registro - Pastelería" },
        {
            name: "description",
            content: "Regístrate para comprar más rápido y guardar tus datos.",
        },
    ];
}

export default function Register() {
    return <AuthPanel mode="register" />;
}
