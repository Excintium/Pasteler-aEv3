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
import { AuthProvider, useAuth } from "~/services/auth-context";
import { NotificationProvider } from "~/services/notification-context";

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

function Shell({ children }: { children: React.ReactNode }) {
    const { usuarioActual, logout } = useAuth();

    return (
        <>
            <header className="header">
                <nav className="navbar">
                    <div className="container">
                        <div className="nav-brand">
                            <h1 className="logo">Pastelería Mil Sabores</h1>
                            <span className="tagline">Dulces momentos desde 1975</span>
                        </div>

                        <ul className="nav-menu" id="nav-menu">
                            <li><NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Inicio</NavLink></li>
                            <li><NavLink to="/productos" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Productos</NavLink></li>
                            <li><NavLink to="/blog" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Blog</NavLink></li>
                            <li><NavLink to="/contacto" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Contacto</NavLink></li>

                            {!usuarioActual && (
                                <>
                                    <li><NavLink to="/registro" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Registro</NavLink></li>
                                    <li><NavLink to="/login" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Iniciar Sesión</NavLink></li>
                                </>
                            )}
                        </ul>

                        <div className="nav-actions">
                            {usuarioActual ? (
                                <>
                                    <NavLink to="/perfil" className="profile-pill" title="Ver perfil">
                                        <i className="fas fa-user" />
                                        <span className="profile-name">{usuarioActual.nombre || usuarioActual.email}</span>
                                    </NavLink>
                                    <button type="button" className="btn-link" onClick={logout} style={{ marginRight: "0.75rem" }}>Cerrar sesión</button>
                                </>
                            ) : (
                                <div className="user-info" style={{ display: "none" }} />
                            )}

                            <NavLink to="/cart" className="cart-btn" id="cart-btn" title="Ver carrito">
                                <i className="fas fa-shopping-cart" />
                                <span className="cart-count" style={{ display: "none" }}>0</span>
                            </NavLink>
                        </div>

                        <button className="nav-toggle"><span /><span /><span /></button>
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
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f" /></a>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a>
                                <a href="https://x.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-x" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 Pastelería Mil Sabores. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

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
            <AuthProvider>
                <NotificationProvider>
                    <CartProvider>
                        <Shell>{children}</Shell>
                    </CartProvider>
                </NotificationProvider>
            </AuthProvider>
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
    return null; 
}