// src/data/products.ts

export interface Product {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    imagen?: string;
}

export const PRODUCTS: Product[] = [
    {
        id: "1",
        nombre: "Torta Tres Leches",
        descripcion: "Bizcocho esponjoso remojado en tres leches, decorado con merengue.",
        precio: 15990,
        categoria: "Tortas",
        imagen: "https://i.pinimg.com/1200x/78/30/ea/7830eaf321d33b0610736bbb42e98a4d.jpg",
    },
    {
        id: "2",
        nombre: "Cheesecake de Frutilla",
        descripcion: "Base de galleta, crema de queso y coulis de frutilla.",
        precio: 17990,
        categoria: "Postres",
        imagen: "https://i.pinimg.com/1200x/c6/6b/82/c66b82ccc85f6fb59df2b0f308f45704.jpg",
    },
    {
        id: "3",
        nombre: "Pie de Limón",
        descripcion: "Relleno cítrico suave con merengue italiano.",
        precio: 12990,
        categoria: "Postres",
        imagen: "https://i.pinimg.com/736x/0b/c5/c8/0bc5c83f9c47650503e6fbeaa4992d0b.jpg",
    },
];
