// app/routes.ts
import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    { path: "productos", file: "routes/products.tsx" },
    { path: "login", file: "routes/login.tsx" },
    { path: "blog", file: "routes/blog.tsx" },
    { path: "registro", file: "routes/register.tsx" },
    { path: "recuperar", file: "routes/forgot-password.tsx" },
    { path: "usuarios", file: "routes/users.tsx" },
    { path: "carrito", file: "routes/cart.tsx" },
    { path: "contacto", file: "routes/contacto.tsx" },
] satisfies RouteConfig;
