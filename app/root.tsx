// app/root.tsx
import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    Link,
    NavLink,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { CartProvider } from "~/services/cart-context";

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&family=Pacifico&display=swap",
    },
    {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <head>
            <title>Pastelería Mil Sabores</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <Meta />
            <Links />
        </head>
        <body>
        <CartProvider>
            <header className="header">
                <nav className="navbar">
                    <div className="container">
                        <div className="nav-brand">
                            <h1 className="logo">Pastelería Mil Sabores</h1>
                            <span className="tagline">
                    Dulces momentos desde 1975
                  </span>
                        </div>

                        <ul className="nav-menu" id="nav-menu">
                            <li>
                                <NavLink
                                    to="/"
                                    end
                                    data-section="home"
                                    className={({ isActive }) =>
                                        "nav-link" + (isActive ? " active" : "")
                                    }
                                >
                                    Inicio
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/productos"
                                    data-section="productos"
                                    className={({ isActive }) =>
                                        "nav-link" + (isActive ? " active" : "")
                                    }
                                >
                                    Productos
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/blog"
                                    data-section="blog"
                                    className={({ isActive }) =>
                                        "nav-link" + (isActive ? " active" : "")
                                    }
                                >
                                    Blog
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contacto"
                                    data-section="contacto"
                                    className={({ isActive }) =>
                                        "nav-link" + (isActive ? " active" : "")
                                    }
                                >
                                    Contacto
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/registro"
                                    data-section="registro"
                                    className={({ isActive }) =>
                                        "nav-link" + (isActive ? " active" : "")
                                    }
                                >
                                    Registro
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/login"
                                    data-section="login"
                                    className={({ isActive }) =>
                                        "nav-link" + (isActive ? " active" : "")
                                    }
                                >
                                    Iniciar Sesión
                                </NavLink>
                            </li>
                        </ul>

                        <div className="nav-actions">
                            <div
                                className="user-info"
                                style={{ display: "none" }}
                            />
                            {/* Botón de carrito → /carrito */}
                            <NavLink
                                to="/carrito"
                                className="cart-btn"
                                id="cart-btn"
                                title="Ver carrito"
                            >
                                <i className="fas fa-shopping-cart" />
                                <span
                                    className="cart-count"
                                    style={{ display: "none" }}
                                >
                      0
                    </span>
                            </NavLink>
                        </div>

                        <button className="nav-toggle">
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Aquí van las páginas (Home, Productos, etc.) */}
            {children}

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h4>Pastelería Mil Sabores</h4>
                            <p>
                                50 años endulzando la vida de las familias chilenas
                                con productos de repostería de la más alta calidad.
                            </p>
                            <div className="social-links">
                                <a href="#" title="Facebook">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a href="#" title="Instagram">
                                    <i className="fab fa-instagram" />
                                </a>
                                <a href="#" title="X">
                                    <i className="fab fa-x" />
                                </a>
                            </div>
                        </div>

                        <div className="footer-section">
                            <h4>Navegación</h4>
                            <ul>
                                {/* Rutas alineadas con routes.ts */}
                                <li>
                                    <Link to="/">Inicio</Link>
                                </li>
                                <li>
                                    <Link to="/productos">Productos</Link>
                                </li>
                                <li>
                                    <Link to="/blog">Blog</Link>
                                </li>
                                <li>
                                    <Link to="/contacto">Contacto</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4>Categorías</h4>
                            <ul>
                                <li>Tortas Especiales</li>
                                <li>Postres Individuales</li>
                                <li>Productos Sin Gluten</li>
                                <li>Opciones Veganas</li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4>Información</h4>
                            <ul>
                                <li>Sobre Nosotros</li>
                                <li>Términos y Condiciones</li>
                                <li>Política de Privacidad</li>
                                <li>Estado del Sistema</li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>
                            &copy; 2024 Pastelería Mil Sabores. Todos los
                            derechos reservados.
                        </p>
                        <p>Hecho con ❤️ en Chile</p>
                        <p>
                            &copy; Desarrolladores: Nicolás Fonseca | Bastián
                            Bravo | Bastián Rubio.
                        </p>
                    </div>
                </div>
            </footer>

            <div id="notification" className="notification">
                <span id="notification-message" />
                <button
                    id="notification-close"
                    className="notification-close"
                >
                    &times;
                </button>
            </div>
        </CartProvider>

        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
            )}
        </main>
    );
}
