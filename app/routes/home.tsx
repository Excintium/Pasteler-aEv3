import type { Route } from "./+types/home";
import { useState } from "react";
import { Link } from "react-router";
import { ProductCard } from "~/components/molecules/ProductCard";
import { ProductModal } from "~/components/organisms/ProductModal";
import { EMPRESA } from "~/data/products"; // Datos estáticos de la empresa
import { api } from "~/services/api";

/**
 * INTERFACE: HomeProduct
 * Refleja la estructura de la entidad 'Product' del Backend NestJS.
 * Se define localmente para asegurar independencia del contrato de datos en esta vista.
 */
interface HomeProduct {
    id: number;
    codigo: string;
    nombre: string;
    categoria: string;
    precio: number;
    descripcion: string;
    imagen: string;
    destacado: boolean;
}

/**
 * LOADER (Server-Side Data Fetching)
 * Patrón estándar en React Router v7.
 * Se ejecuta antes de renderizar la ruta para proveer datos frescos.
 */
export async function loader() {
    try {
        // Petición al endpoint /products del Backend
        const { data } = await api.get<HomeProduct[]>("/products");

        // Lógica de Presentación:
        // Filtramos productos destacados y limitamos a 4 para la grilla del Home.
        const featuredProducts = data
            .filter((p) => p.destacado)
            .slice(0, 4);

        return { featuredProducts, error: null };
    } catch (error) {
        console.error("[HomeLoader] Error fetching products:", error);
        // Fallback gracefully: devolvemos lista vacía para no romper la UI completa
        return { featuredProducts: [], error: "No se pudieron cargar los productos destacados." };
    }
}

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Pastelería Mil Sabores - Dulces momentos desde 1973" },
        { name: "description", content: "Pastelería Mil Sabores - 50 años endulzando la vida de las familias chilenas." },
    ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
    // Desestructuración de datos provenientes del loader
    const { featuredProducts, error } = loaderData;

    // --- LÓGICA DEL MODAL (UI State) ---
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    const handleViewProduct = (product: any) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <section id="home" className="section active">
            {/* --- HERO SECTION (Estático) --- */}
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

            {/* --- PRODUCTOS DESTACADOS (Dinámico desde Backend) --- */}
            <div className="container">
                <h3 className="section-title">Productos Destacados</h3>

                {featuredProducts.length > 0 ? (
                    <div className="products-grid" id="featured-products">
                        {featuredProducts.map((producto) => (
                            <ProductCard
                                key={producto.id} // Usamos ID de base de datos
                                product={producto}
                                onView={handleViewProduct}
                            />
                        ))}
                    </div>
                ) : (
                    // Estado Vacío / Error
                    <div className="text-center py-10">
                        {error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <p className="text-gray-500">Pronto tendremos novedades para ti.</p>
                        )}
                    </div>
                )}
            </div>

            {/* --- INFO EMPRESA (Estático) --- */}
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