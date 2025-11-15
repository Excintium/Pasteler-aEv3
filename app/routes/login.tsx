import type { Route } from "./+types/login";
import { Link } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Iniciar Sesión - Pastelería Mil Sabores" },
    ];
}

export default function Login() {
    return (
        <section id="login" className="section active">
            <div className="container">
                <h2 className="section-title">Iniciar Sesión</h2>
                <p className="section-subtitle">Accede a tu cuenta y disfruta de tus beneficios</p>

                <div className="form-container">
                    <form id="login-form" className="auth-form">
                        <div className="form-group">
                            <label htmlFor="login-email">Email</label>
                            <input type="email" id="login-email" name="email" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="login-password">Contraseña</label>
                            <input type="password" id="login-password" name="password" required />
                        </div>

                        <button type="submit" className="btn-primary full-width">
                            <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
                        </button>
                    </form>

                    <div className="form-footer">
                        <p>¿No tienes cuenta? <Link to="/registro" data-section="registro">Regístrate aquí</Link></p>
                    </div>

                    <div className="demo-users">
                        <h4>👥 Usuarios de Prueba:</h4>

                        <div className="demo-user">
                            <strong>Usuario Mayor:</strong> mayor@gmail.com / password123<br />
                            <small>Recibe 50% descuento por edad</small>
                        </div>

                        <div className="demo-user">
                            <strong>Estudiante Duoc:</strong> estudiante@duoc.cl / password123<br />
                            <small>Torta gratis en cumpleaños</small>
                        </div>

                        <div className="demo-user">
                            <strong>Usuario Regular:</strong> usuario@gmail.com / password123<br />
                            <small>Descuentos aplicables con códigos</small>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}