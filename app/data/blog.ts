export type Articulo = {
    id: number;
    titulo: string;
    // Permitimos string general para soportar lo que venga de BD,
    // aunque idealmente debería ser un Union Type estricto si validamos en ambos lados.
    categoria: string;
    contenido: string;
    fecha: string;    // Mapearemos 'createdAt' a 'fecha' en la vista
    autor: string;
    imagen: string;
};

export const BLOG_ARTICULOS: Articulo[] = [
    {
        id: 1,
        titulo: "Cómo elegir la torta perfecta para tu celebración",
        categoria: "tips",
        contenido:
            "Elegir la torta ideal depende del número de invitados, los sabores preferidos y el tipo de evento. En este artículo te contamos cómo combinar rellenos, coberturas y decoraciones para que tu torta sea la protagonista de la mesa...",
        fecha: "2025-11-10",
        autor: "Equipo Mil Sabores",
        imagen: "🎂",
    },
    {
        id: 2,
        titulo: "Receta básica de bizcocho esponjoso",
        categoria: "recetas",
        contenido:
            "Un buen bizcocho es la base de casi todas las tortas. Te mostramos una receta sencilla y paso a paso para lograr un bizcocho alto, esponjoso y muy sabroso, ideal para rellenar con lo que quieras...",
        fecha: "2025-11-12",
        autor: "Chef Carla",
        imagen: "🍰",
    },
    {
        id: 3,
        titulo: "La historia de Pastelería Mil Sabores",
        categoria: "historia",
        contenido:
            "Desde un pequeño taller familiar en 1975 hasta convertirse en una pastelería reconocida por sus tortas personalizadas, Mil Sabores ha acompañado los momentos más importantes de miles de familias chilenas...",
        fecha: "2025-11-01",
        autor: "Equipo Mil Sabores",
        imagen: "📖",
    },
];
