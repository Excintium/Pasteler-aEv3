/**
 * Utilidades de Formato
*/

// La URL base de tus imágenes estáticas (debe coincidir con tu backend)
const STATIC_URL = "http://localhost:3000/static";

/**
 * Formatea un número a Peso Chileno
 * @param amount Cantidad numérica
 * @returns String formateado (ej: $ 45.000)
 */
export const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
    }).format(amount);
};

/**
 * Genera la URL completa para una imagen de producto.
 * Maneja el caso donde la BD guardó 'public/products/...' o solo 'products/...'
 * @param imagePath Ruta guardada en la BD
 * @returns URL absoluta http://localhost:3000/static/products/foto.webp
 */
export const getProductImageUrl = (imagePath: string): string => {
    if (!imagePath) return "/placeholder.png"; // Imagen por defecto si falla
    if (imagePath.startsWith("http")) return imagePath; // Si ya es URL completa

    // Limpiamos el prefijo 'public/' si existe, ya que el servidor lo mapea a '/static/'
    const cleanPath = imagePath.replace(/^public\//, "");

    // Aseguramos que no haya doble slash //
    return `${STATIC_URL}/${cleanPath}`.replace(/([^:]\/)\/+/g, "$1");
};