import type { Route } from "./+types/home";
import { Button } from '../../src/components/atoms/Button';

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Mi Pastelería" }, // Título actualizado
        { name: "description", content: "Bienvenido a la mejor pastelería." },
    ];
}

export default function Home() {
    return (
        <main className="pt-16 p-4 container mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">
                ¡Bienvenido a la Pastelería!
            </h1>

            {/* 2. Usa tu nuevo componente */}
            <Button type="primary">Ver Pasteles</Button>
        </main>
    );
}