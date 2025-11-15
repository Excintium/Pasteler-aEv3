// app/routes/products.tsx
import type { Route } from "./+types/products";
import { Typography } from "antd";
import { useNavigate } from "react-router";
import { ProductList } from "../../src/components/organisms/ProductList";

const { Title } = Typography;

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Productos - Pastelería" },
        {
            name: "description",
            content: "Catálogo de productos de la pastelería.",
        },
    ];
}

export default function Products() {
    const navigate = useNavigate();

    return (
        <main className="pt-16 p-4 container mx-auto">
            <Title level={2} className="mb-6 text-center">
                Nuestros productos
            </Title>

            <ProductList
                onVerDetalle={(id) => navigate(`/producto/${id}`)}
                onAgregarCarrito={(id) => {
                    // Aquí más adelante integras lógica real de carrito
                    console.log("Agregar al carrito id:", id);
                }}
            />
        </main>
    );
}
