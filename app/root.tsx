import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";
import { Link } from "react-router-dom";

import type { Route } from "./+types/root";
import "./app.css";

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
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    }
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
        </head>
        <body>

        <header className="header">
            <nav className="navbar">
                <div className="container">
                    <div className="nav-brand">
                        <h1 className="logo">Pastelería Mil Sabores</h1>
                        <span className="tagline">Dulces momentos desde 1975</span>
                    </div>

                    <ul className="nav-menu" id="nav-menu">
                        <li><Link to="/home" className="nav-link active" data-section="home">Inicio</Link></li>
                        <li><Link to="/products" className="nav-link" data-section="productos">Productos</Link></li>
                        <li><Link to="/blog" className="nav-link" data-section="blog">Blog</Link></li>
                        <li><Link to="/contacto" className="nav-link" data-section="contacto">Contacto</Link></li>
                        <li><Link to="/register" className="nav-link" data-section="registro">Registro</Link></li>
                        <li><Link to="/login" className="nav-link" data-section="login">Iniciar Sesión</Link></li>
                    </ul>

                    <div className="nav-actions">
                        <div className="user-info" style={{ display: 'none' }}></div>
                        <button className="cart-btn" id="cart-btn" title="Ver carrito">
                            <i className="fas fa-shopping-cart"></i>
                            <span className="cart-count" style={{ display: 'none' }}>0</span>
                        </button>
                    </div>

                    <button className="nav-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        </header>

        {children}

        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Pastelería Mil Sabores</h4>
                        <p>50 años endulzando la vida de las familias chilenas con productos de repostería de la más alta calidad.</p>
                        <div className="social-links">
                            <a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" title="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="#" title="X"><i className="fab fa-x"></i></a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>Navegación</h4>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/productos">Productos</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/contacto">Contacto</Link></li>
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
                    <p>&copy; 2024 Pastelería Mil Sabores. Todos los derechos reservados.</p>
                    <p>Hecho con ❤️ en Chile</p>
                    <p>&copy; Desarrolladores: Nicolás Fonseca | Bastián Bravo | Bastián Rubio.</p>
                </div>
            </div>
        </footer>

        <div id="notification" className="notification">
            <span id="notification-message"></span>
            <button id="notification-close" className="notification-close">&times;</button>
        </div>

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