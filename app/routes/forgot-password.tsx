// app/routes/forgot-password.tsx
import type { Route } from "./+types/forgot-password";
import { AuthPanel } from "~/components/organisms/AuthPanel";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Recuperar contraseña - Pastelería" },
        {
            name: "description",
            content: "Recupera el acceso a tu cuenta.",
        },
    ];
}

export default function ForgotPassword() {
    return <AuthPanel mode="forgot" />;
}
