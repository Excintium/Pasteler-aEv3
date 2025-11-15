import { PRODUCTOS, CATEGORIAS } from "../../src/data/products";
import { ProductCard } from "../../src/components/molecules/ProductCard";

export function meta() {
    return [
        { title: "Productos - Pastelería Mil Sabores" },
    ];
}

export default function Productos() {
    return (
        <section id="productos" className="section active">
            <div className="container">
                <h2 className="section-title">Nuestros Productos</h2>

                <div className="product-controls">
                    <input type="text"
                           id="product-search"
                           className="product-search"
                           placeholder="🔍 Buscar productos..."/>
                </div>

                <div className="filters">
                    <button className="filter-btn active" data-category="all">Todos</button>

                    {CATEGORIAS.map(categoria => (
                        <button key={categoria} className="filter-btn" data-category={categoria}>
                            {categoria}
                        </button>
                    ))}
                </div>

                <div className="products-grid" id="products-grid">
                    {PRODUCTOS.map(producto => (
                        <ProductCard key={producto.codigo} producto={producto} />
                    ))}
                </div>
            </div>
        </section>
    );
}