import type { Route } from "./+types/home";
import { useState } from "react";
import { PRODUCTOS, EMPRESA, type Producto } from "~/data/products";
import { ProductCard } from "~/components/molecules/ProductCard";
import { ProductModal } from "~/components/organisms/ProductModal";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        {
            title: "Pastelería Mil Sabores - Dulces momentos desde 1973",
        },
        {
            name: "description",
            content:
                "Pastelería Mil Sabores - 50 años endulzando la vida de las familias chilenas.",
        },
    ];
}

export default function Home() {
    const productosDestacados = PRODUCTOS.filter((p) => p.destacado).slice(0, 4);

    // LÓGICA DEL MODAL
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

    const handleViewProduct = (product: Producto) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <section id="home" className="section active">
            <div className="hero">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h2 className="hero-title">Celebrando 50 años de tradición</h2>
                            <p className="hero-subtitle">
                                Desde 1973 endulzando la vida de las familias chilenas
                            </p>

                            <div className="hero-features">
                                <div className="feature">
                                    <i className="fas fa-birthday-cake" />
                                    <span>Tortas personalizadas para toda ocasión</span>
                                </div>
                                <div className="feature">
                                    <i className="fas fa-leaf" />
                                    <span>Opciones sin gluten y veganas disponibles</span>
                                </div>
                                <div className="feature">
                                    <i className="fas fa-truck" />
                                    <span>Entregas en toda la Región Metropolitana</span>
                                </div>
                                <div className="feature">
                                    <i className="fas fa-heart" />
                                    <span>Hechos con amor y tradición familiar</span>
                                </div>
                            </div>

                            <Link to="/productos" className="btn-primary hero-btn">
                                <i className="fas fa-store" /> Ver Productos
                            </Link>
                        </div>

                        <div className="hero-image">
                            <div className="anniversary-badge">
                                <div className="anniversary-number">{EMPRESA.aniversario}</div>
                                <div className="anniversary-text">años</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <h3 className="section-title">Productos Destacados</h3>
                <div className="products-grid" id="featured-products">
                    {productosDestacados.map((producto) => (
                        <ProductCard
                            key={producto.codigo}
                            product={producto}
                            onView={handleViewProduct}
                        />
                    ))}
                </div>
            </div>

            <div className="company-info">
                <div className="container">
                    <div className="info-grid">
                        <div className="info-card">
                            <h4>Nuestra Misión</h4>
                            <p>{EMPRESA.mision}</p>
                        </div>
                        <div className="info-card">
                            <h4>Nuestra Visión</h4>
                            <p>{EMPRESA.vision}</p>
                        </div>
                        <div className="info-card">
                            <h4>Nuestra Historia</h4>
                            <p>
                                Desde 1975, hemos mantenido la tradición familiar en la
                                repostería, incluso obteniendo un Récord Guinness en 1995.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ProductModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </section>
    );
}