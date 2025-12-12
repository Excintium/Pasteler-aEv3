/**
 * Nivel de documentación: Senior
 * Refactorización: Integración real con AuthContext y eliminación de lógica mock.
 */
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router"; // React Router v6/v7
import { useAuth } from "~/services/auth-context"; // Importamos el contexto real

interface AuthFormProps {
    mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
    const navigate = useNavigate();
    const { login, register, error: authError, isLoading } = useAuth(); // Usamos el hook
    const isLogin = mode === "login";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    // Nota: El backend pide 'fechaNacimiento' para calcular rol mayor,
    // deberías agregar ese input si quieres que la lógica de negocio funcione.

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (isLogin) {
                await login(email, password);
                navigate("/"); // Redirección tras login exitoso
            } else {
                // Registro real contra el backend
                await register({
                    nombre: nombre || "Usuario Nuevo",
                    email,
                    password,
                    // fechaNacimiento: "1990-01-01" // Agregar input de fecha
                });
                navigate("/");
            }
        } catch (e) {
            // El error se maneja en el AuthContext, pero podemos hacer log aquí si es necesario
            console.error("Error en autenticación", e);
        }
    };

    return (
        <section className="section active auth-section">
            <div className="container auth-layout">
                <div className="auth-card">
                    <h2 className="section-title">
                        {isLogin ? "Iniciar Sesión" : "Registro de Usuario"}
                    </h2>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {/* Campo Nombre solo para registro */}
                        {!isLogin && (
                            <label className="form-field">
                                <span>Nombre Completo</span>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                    placeholder="Tu nombre"
                                />
                            </label>
                        )}

                        <label className="form-field">
                            <span>Correo electrónico</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="ej: usuario@gmail.com"
                            />
                        </label>

                        <label className="form-field">
                            <span>Contraseña</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </label>

                        {/* Mostramos errores que vienen del contexto (API) */}
                        {authError && <p className="form-error">{authError}</p>}

                        <button
                            type="submit"
                            className="btn-primary auth-submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? "Procesando..." : (isLogin ? "Entrar" : "Registrarme")}
                        </button>

                        <div className="auth-switch">
                            {/* ... Links de navegación ... */}
                            {isLogin ? (
                                <span>¿No tienes cuenta? <Link to="/register">Crear cuenta</Link></span>
                            ) : (
                                <span>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></span>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}