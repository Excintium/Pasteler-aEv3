// src/components/organisms/ProductList.tsx
import React from "react";
import { Row, Col } from "antd";
import { PRODUCTS } from "../../data/products";
import { ProductCard } from "../molecules/ProductCard";

interface ProductListProps {
    onVerDetalle?: (id: string) => void;
    onAgregarCarrito?: (id: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
                                                            onVerDetalle,
                                                            onAgregarCarrito,
                                                        }) => {
    return (
        <Row gutter={[16, 16]} justify="center">
            {PRODUCTS.map((product) => (
                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                    <ProductCard
                        product={product}
                        onVerDetalle={onVerDetalle}
                        onAgregarCarrito={onAgregarCarrito}
                    />
                </Col>
            ))}
        </Row>
    );
};
