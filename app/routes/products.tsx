import type { Route } from "./+types/products";
import { useLoaderData, Link } from "react-router";
import { useState, useMemo } from "react";
import { ProductCard } from "~/components/molecules/ProductCard";
import { ProductModal } from "~/components/organisms/ProductModal";
import { api } from "~/services/api";
import { getProductImageUrl } from "~/utils/formatters";

/**
 * Definición del Tipo Producto (Adaptado al Backend)
 * El backend devuelve: { id, codigo, nombre, precio, imagen, categoria, descripcion, destacado }
 */
export interface BackendProduct {
    id: number;
    codigo: string;
    nombre: string;
    precio: number;
    imagen: string;
    categoria: string;
    descripcion: string;
    destacado: boolean;
}

export function meta({}: Route.MetaArgs) {
    return [{ title: "Productos - Pastelería Mil Sabores" }];
}

/**
 * LOADER (Backend Data Fetching)
 * Esta función se ejecuta en el cliente (SPA) antes de mostrar la ruta.
 * Si falla la API, puedes manejar errores aquí o en un ErrorBoundary.
 */
export async function clientLoader() {
    try {
        const { data } = await api.get<BackendProduct[]>("/products");
        return { products: data };
    } catch (error) {
        console.error("Error cargando productos:", error);
        return { products: [] }; // Retornamos array vacío en caso de error
    }
}

export default function Productos() {
    // 1. Obtenemos los datos del loader
    const { products } = useLoaderData<typeof clientLoader>();

    // 2. Estados locales para filtros y modal
    const [search, setSearch] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("all");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<BackendProduct | null>(null);

    // 3. Extraemos categorías únicas dinámicamente de los productos reales
    const categorias = useMemo(() => {
        const cats = new Set(products.map(p => p.categoria).map(c => c.replace("public/products/", "")));
        // Nota: El .replace es un parche por si se coló basura en la categoría en el seed.
        // Idealmente limpiar la BD.
        return Array.from(cats);
    }, [products]);

    // 4. Lógica del Modal
    const handleViewProduct = (product: BackendProduct) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    // 5. Filtrado
    const productosFiltrados = useMemo(() => {
        return products.filter((p) => {
            const matchCategoria =
                categoriaSeleccionada === "all" ||
                p.categoria === categoriaSeleccionada;

            const term = search.trim().toLowerCase();
            const matchSearch =
                term === "" ||
                p.nombre.toLowerCase().includes(term) ||
                p.descripcion.toLowerCase().includes(term) ||
                p.categoria.toLowerCase().includes(term);

            return matchCategoria && matchSearch;
        });
    }, [search, categoriaSeleccionada, products]);

    return (
        <section id="productos" className="section active">
            <div className="container">
                <h2 className="section-title">Nuestros Productos</h2>

                <div className="product-controls">
                    <input
                        type="text"
                        className="product-search"
                        placeholder="🔍 Buscar productos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Filtros de Categoría */}
                <div className="filters">
                    <button
                        className={"filter-btn" + (categoriaSeleccionada === "all" ? " active" : "")}
                        onClick={() => setCategoriaSeleccionada("all")}
                    >
                        Todos
                    </button>
                    {categorias.map((categoria) => (
                        <button
                            key={categoria}
                            className={"filter-btn" + (categoriaSeleccionada === categoria ? " active" : "")}
                            onClick={() => setCategoriaSeleccionada(categoria)}
                        >
                            {categoria}
                        </button>
                    ))}
                </div>

                {/* Grid de Productos */}
                {productosFiltrados.length > 0 ? (
                    <div className="products-grid">
                        {productosFiltrados.map((producto) => (
                            <ProductCard
                                key={producto.id} // Usamos ID de base de datos ahora
                                product={producto}
                                onView={handleViewProduct}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <p>No encontramos productos que coincidan con tu búsqueda 😢</p>
                        <button className="btn-secondary" onClick={() => {setSearch(''); setCategoriaSeleccionada('all')}}>
                            Ver todos
                        </button>
                    </div>
                )}
            </div>

            {/* Modal de Detalle */}
            <ProductModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </section>
    );
}