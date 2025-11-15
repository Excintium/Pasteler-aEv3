import type { Route } from "./+types/registro";
import { Link } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Registro - Pastelería Mil Sabores" },
    ];
}

export default function Registro() {
    return (
        <section id="registro" className="section active">
            <div className="container">
                <h2 className="section-title">Registro de Usuario</h2>
                <p className="section-subtitle">Únete a nuestra familia Mil Sabores y disfruta de beneficios especiales</p>

                <div className="form-container">
                    <form id="registro-form" className="auth-form">
                        <div className="form-group">
                            <label htmlFor="registro-nombre">Nombre Completo</label>
                            <input type="text" id="registro-nombre" name="nombre" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="registro-email">Email</label>
                            <input type="email" id="registro-email" name="email" required />
                            <small className="form-help">Acepta: @gmail.com, @duoc.cl, @profesor.duoc.cl</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="registro-password">Contraseña</label>
                            <input type="password" id="registro-password" name="password" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="registro-confirm-password">Confirmar Contraseña</label>
                            <input type="password" id="registro-confirm-password" name="confirm-password" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="registro-fecha">Fecha de Nacimiento</label>
                            <input type="date" id="registro-fecha" name="fecha" required />
                        </div>

                        <div className="form-benefits">
                            <h4>🎁 Beneficios Exclusivos</h4>
                            <ul>
                                <li><i className="fas fa-gift"></i> Torta gratis en tu cumpleaños (estudiantes Duoc)</li>
                                <li><i className="fas fa-percentage"></i> 50% descuento (mayores de 60 años)</li>
                                <li><i className="fas fa-tags"></i> Descuentos especiales con códigos</li>
                                <li><i className="fas fa-truck"></i> Envío gratis en compras sobre $50.000</li>
                            </ul>
                        </div>

                        <button type="submit" className="btn-primary full-width">
                            <i className="fas fa-user-plus"></i> Registrarse
                        </button>
                    </form>

                    <div className="form-footer">
                        <p>¿Ya tienes cuenta? <Link to="/login" data-section="login">Inicia sesión aquí</Link></p>
                    </div>
                </div>
            </div>
        </section>
    );
}