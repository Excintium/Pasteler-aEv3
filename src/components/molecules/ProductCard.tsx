import React from "react";
import { Card, Typography } from "antd";
import { Button } from "../atoms/Button";
import type { Product } from "../../data/products";

const { Title, Paragraph, Text } = Typography;

interface ProductCardProps {
    product: Product;
    onVerDetalle?: (id: string) => void;
    onAgregarCarrito?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
                                                            product,
                                                            onVerDetalle,
                                                            onAgregarCarrito,
                                                        }) => {
    return (
        <Card
            hoverable
            cover={
                product.imagen ? (
                    <img src={product.imagen} alt={product.nombre} />
                ) : null
            }
            style={{ width: 300 }}
        >
            <Title level={4}>{product.nombre}</Title>
            <Paragraph ellipsis={{ rows: 2 }}>{product.descripcion}</Paragraph>
            <Text strong>${product.precio.toLocaleString("es-CL")}</Text>
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                {onVerDetalle && (
                    <Button type="default" onClick={() => onVerDetalle(product.id)}>
                        Ver detalle
                    </Button>
                )}
                {onAgregarCarrito && (
                    <Button type="primary" onClick={() => onAgregarCarrito(product.id)}>
                        Agregar al carrito
                    </Button>
                )}
            </div>
        </Card>
    );
};
