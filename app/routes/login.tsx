// app/routes/login.tsx
import type { Route } from "./+types/login";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "~/services/auth-context";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Login - Pastelería Mil Sabores" },
        {
            name: "description",
            content: "Inicia sesión para gestionar tus pedidos.",
        },
    ];
}

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        setError(null);

        if (!email || !password) {
            setError("Por favor ingresa tu correo y contraseña.");
            return;
        }

        try {
            setLoading(true);
            login(email, password);
            navigate("/", { replace: true });
        } catch (err: any) {
            setError(err?.message ?? "Correo o contraseña incorrectos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="login" className="section active">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Iniciar Sesión</h2>
                    <p className="section-subtitle">
                        Accede a tu cuenta para gestionar tus pedidos y ver tus beneficios
                        especiales.
                    </p>
                </div>

                <div className="form-container">
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="login-email">Correo electrónico</label>
                            <input
                                id="login-email"
                                name="email"
                                type="email"
                                required
                                placeholder="tu@correo.cl"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="login-password">Contraseña</label>
                            <input
                                id="login-password"
                                name="password"
                                type="password"
                                required
                                placeholder="Ingresa tu contraseña"
                            />
                        </div>

                        {error && <div className="form-error">{error}</div>}

                        <button type="submit" className="btn-primary full-width" disabled={loading}>
                            {loading ? "Ingresando..." : "Iniciar Sesión"}
                        </button>

                        <div className="form-footer">
                            <p>
                                ¿No tienes cuenta?{" "}
                                <Link to="/registro" className="link">
                                    Regístrate aquí
                                </Link>
                            </p>
                            <p className="form-help">
                                ¿Olvidaste tu contraseña?{" "}
                                <Link to="/recuperar">Recuperar contraseña</Link>
                            </p>
                        </div>
                    </form>

                    <aside className="auth-benefits">
                        <h3>Beneficios de tener una cuenta</h3>
                        <ul>
                            <li>🎂 Guardar tus tortas favoritas</li>
                            <li>📦 Seguir el estado de tus pedidos</li>
                            <li>🎉 Descuentos exclusivos y promociones</li>
                            <li>🎈 Sorpresas especiales en tu cumpleaños</li>
                        </ul>
                    </aside>

                    <aside className="auth-benefits">
                        <h3>👥 Usuarios de Prueba:</h3>
                        <ul>
                            <div className="demo-user">
                                <strong>Usuario Mayor:</strong> mayor@gmail.com / password123
                                <br />
                                <small>Recibe 50% descuento por edad</small>
                            </div>

                            <div className="demo-user">
                                <strong>Estudiante Duoc:</strong> estudiante@duoc.cl / password123
                                <br />
                                <small>Torta gratis en cumpleaños</small>
                            </div>

                            <div className="demo-user">
                                <strong>Usuario Regular:</strong> usuario@gmail.com / password123
                                <br />
                                <small>Descuentos aplicables con códigos</small>
                            </div>
                        </ul>
                    </aside>
                </div>
            </div>
        </section>
    );
}
