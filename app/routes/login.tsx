// app/routes/login.tsx
import type { Route } from "./+types/login";
import { AuthPanel } from "../../src/components/organisms/AuthPanel";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Login - Pastelería" },
        {
            name: "description",
            content: "Inicia sesión para gestionar tus pedidos.",
        },
    ];
}

export default function Login() {
    return <AuthPanel mode="login" />;
}
