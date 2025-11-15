import type { Route } from "./+types/home";
import { Typography, Card } from "antd";
import { Link } from "react-router";
import { Button } from "../../src/components/atoms/Button";
import { ProductList } from "../../src/components/organisms/ProductList";

const { Title, Paragraph } = Typography;

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Mil Sabores Dulces - Inicio" },
        {
            name: "description",
            content:
                "Pastelería artesanal con tortas y postres hechos a mano. Un sabor para cada momento.",
        },
    ];
}

export default function Home() {
    return (
        <div className="global-container">
            {/* --- HERO --- */}
            <section className="mb-12 grid gap-8 md:grid-cols-2 items-center home-hero">
                <div>
                    <Title style={{ fontSize: "2.5rem", color: "#D9486E" }}>
                        Mil Sabores Dulces
                    </Title>

                    <Paragraph style={{ fontSize: "1.1rem", color: "#5A5A5A" }}>
                        Pastelería artesanal con recetas únicas, sabores suaves y diseños
                        personalizados para tus momentos especiales.
                    </Paragraph>

                    <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                        <Link to="/productos">
                            <Button type="primary" size="large" className="btn-rose">
                                Ver catálogo
                            </Button>
                        </Link>

                        <Link to="/login">
                            <Button size="large" className="btn-rounded">
                                Iniciar sesión
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Imagen ajustada */}
                <div
                    style={{
                        width: "100%",
                        maxHeight: "320px",
                        overflow: "hidden",
                        borderRadius: "20px",
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                    }}
                >
                </div>
            </section>

            {/* --- DESTACADOS --- */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <Title level={3} style={{ color: "#C73E5C" }}>
                        Productos destacados
                    </Title>

                    <Link to="/productos">
                        <Button type="link" style={{ color: "#C73E5C" }}>
                            Ver todo
                        </Button>
                    </Link>
                </div>

                <ProductList />
            </section>

            {/* --- CUADROS FINALES --- */}
            <section className="mt-8 grid gap-6 lg:grid-cols-2">
                <Card
                    className="shadow-sm card-soft"
                    style={{ backgroundColor: "#FFEFF2" }}
                >
                    <Title level={4} style={{ color: "#C73E5C" }}>
                        ¿Ya tienes cuenta?
                    </Title>
                    <Paragraph>
                        Accede a tus pedidos y disfruta de un proceso más rápido.
                    </Paragraph>
                    <Link to="/login">
                        <Button type="primary" className="btn-rose">
                            Iniciar sesión
                        </Button>
                    </Link>
                </Card>

                <Card
                    className="shadow-sm card-soft"
                    style={{ backgroundColor: "#FFF4D9" }}
                >
                    <Title level={4} style={{ color: "#BC7A00" }}>
                        ¿Olvidaste tu contraseña?
                    </Title>
                    <Paragraph>
                        Recupera el acceso a tu cuenta de forma fácil.
                    </Paragraph>
                    <Link to="/recuperar">
                        <Button type="default" className="btn-rounded">
                            Recuperar contraseña
                        </Button>
                    </Link>
                </Card>
            </section>
        </div>
    );
}
