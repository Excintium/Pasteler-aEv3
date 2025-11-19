import type { Route } from "./+types/products";
import { useMemo, useState } from "react";
import { PRODUCTOS, CATEGORIAS, type Producto } from "~/data/products";
import { ProductCard } from "~/components/molecules/ProductCard";
import { ProductModal } from "~/components/organisms/ProductModal";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Productos - Pastelería Mil Sabores" }];
}

export default function Productos() {
    const [search, setSearch] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("all");
    
    // Estado para el modal
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

    const productosFiltrados = useMemo(
        () =>
            PRODUCTOS.filter((p) => {
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
            }),
        [search, categoriaSeleccionada],
    );

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

                <div className="filters">
                    <button
                        className={"filter-btn" + (categoriaSeleccionada === "all" ? " active" : "")}
                        onClick={() => setCategoriaSeleccionada("all")}
                    >
                        Todos
                    </button>
                    {CATEGORIAS.map((categoria) => (
                        <button
                            key={categoria}
                            className={"filter-btn" + (categoriaSeleccionada === categoria ? " active" : "")}
                            onClick={() => setCategoriaSeleccionada(categoria)}
                        >
                            {categoria}
                        </button>
                    ))}
                </div>

                <div className="products-grid">
                    {productosFiltrados.map((producto) => (
                        <ProductCard 
                            key={producto.codigo} 
                            product={producto} 
                            onView={handleViewProduct}
                        />
                    ))}
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