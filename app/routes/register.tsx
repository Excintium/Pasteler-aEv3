// app/routes/register.tsx
import type { Route } from "./+types/register";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "~/services/auth-context";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Registro - Pastelería Mil Sabores" },
        {
            name: "description",
            content: "Crea tu cuenta para disfrutar de beneficios exclusivos.",
        },
    ];
}

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const nombre = String(formData.get("nombre") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");
        const confirm = String(formData.get("confirm") ?? "");
        const fechaNacimiento = String(formData.get("fechaNacimiento") ?? "") || undefined;

        setError(null);

        if (!nombre || !email || !password || !confirm) {
            setError("Por favor completa todos los campos obligatorios.");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (password !== confirm) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            setLoading(true);
            register({ nombre, email, password, fechaNacimiento });
            navigate("/", { replace: true });
        } catch (err: any) {
            setError(err?.message ?? "No se pudo registrar el usuario.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="registro" className="section active">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Crear Cuenta</h2>
                    <p className="section-subtitle">
                        Regístrate para acceder a beneficios exclusivos y guardar tus pedidos.
                    </p>
                </div>

                <div className="form-container">
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="reg-nombre">Nombre completo</label>
                            <input
                                id="reg-nombre"
                                name="nombre"
                                type="text"
                                required
                                placeholder="Ej: Elmer Curio"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reg-email">Correo electrónico</label>
                            <input
                                id="reg-email"
                                name="email"
                                type="email"
                                required
                                placeholder="tu@correo.cl"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reg-fecha-nacimiento">
                                Fecha de nacimiento (opcional)
                            </label>
                            <input
                                id="reg-fecha-nacimiento"
                                name="fechaNacimiento"
                                type="date"
                            />
                            <small className="form-help">
                                Nos ayuda a identificar si eres{" "}
                                <strong>adulto mayor</strong> o{" "}
                                <strong>estudiante Duoc</strong> para aplicar beneficios.
                            </small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="reg-password">Contraseña</label>
                            <input
                                id="reg-password"
                                name="password"
                                type="password"
                                required
                                placeholder="Mínimo 6 caracteres"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reg-confirm">Confirmar contraseña</label>
                            <input
                                id="reg-confirm"
                                name="confirm"
                                type="password"
                                required
                                placeholder="Repite la contraseña"
                            />
                        </div>

                        {error && <div className="form-error">{error}</div>}

                        <button
                            type="submit"
                            className="btn-primary full-width"
                            disabled={loading}
                        >
                            {loading ? "Creando cuenta..." : "Crear Cuenta"}
                        </button>

                        <div className="form-footer">
                            <p>
                                ¿Ya tienes cuenta?{" "}
                                <Link to="/login" className="link">
                                    Inicia sesión aquí
                                </Link>
                            </p>
                        </div>
                    </form>

                    <aside className="auth-benefits">
                        <h3>Tipos de usuario y beneficios</h3>
                        <ul>
                            <li>🧓 <strong>Usuario Mayor:</strong> 50% de descuento por edad.</li>
                            <li>
                                🎓 <strong>Estudiante Duoc:</strong> Torta de cumpleaños gratis.
                            </li>
                            <li>
                                😊 <strong>Usuario Regular:</strong> Descuentos con códigos y
                                promociones.
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>
        </section>
    );
}
