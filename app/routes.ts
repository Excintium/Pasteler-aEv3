// app/routes.ts
import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
    // Home en la raíz: http://localhost:5173/
    index("routes/home.tsx"),

    // Productos en /productos
    { path: "productos", file: "routes/products.tsx" },

    { path: "login", file: "routes/login.tsx" },
    { path: "blog", file: "routes/blog.tsx" },
    { path: "registro", file: "routes/register.tsx" },
    { path: "recuperar", file: "routes/forgot-password.tsx" },
    { path: "usuarios", file: "routes/users.tsx" },

    // Carrito en /carrito
    { path: "carrito", file: "routes/cart.tsx" },

    { path: "contacto", file: "routes/contacto.tsx" },
] satisfies RouteConfig;
