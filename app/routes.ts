import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    { path: "productos", file: "routes/products.tsx" },
    { path: "login", file: "routes/login.tsx" },
    { path: "registro", file: "routes/register.tsx" },
    { path: "blog", file: "routes/blog.tsx" },
    { path: "blog/:id", file: "routes/blog-detail.tsx" }, // <--- NUEVA RUTA
    { path: "contacto", file: "routes/contacto.tsx" },
    { path: "recuperar", file: "routes/forgot-password.tsx" },
    { path: "cart", file: "routes/cart.tsx" },
    { path: "perfil", file: "routes/perfil.tsx" },
    { path: "admin", file: "routes/admin.tsx" }, // <--- NUEVA RUTA
] satisfies RouteConfig;