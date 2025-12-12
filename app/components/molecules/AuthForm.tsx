import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router"; // Ajusta si usas 'react-router-dom'
import { useAuth } from "~/services/auth-context"; // Importamos el contexto real

interface AuthFormProps {
    mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
    const navigate = useNavigate();
    const isLogin = mode === "login";

    // 1. Usamos el hook que SÍ conecta con el Backend NestJS
    const { login, register, error: authError, isLoading } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState(""); // Necesario para registro real

    // Estado local para errores de validación de formulario (campos vacíos)
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLocalError(null);

        // Validaciones básicas de UI
        if (!email || !password) {
            setLocalError("Completa todos los campos");
            return;
        }

        try {
            if (isLogin) {
                // 2. Llamada real a la API (POST /auth/login)
                await login(email, password);
                navigate("/");
            } else {
                // 3. Llamada real a la API (POST /auth/register)
                // Nota: El backend espera 'name', 'email', 'password', etc.
                if (!nombre) {
                    setLocalError("El nombre es obligatorio para registrarse");
                    return;
                }
                await register({
                    nombre,
                    email,
                    password,
                    // Si el backend requiere fechaNacimiento, agrégala aquí o en el form
                    // fechaNacimiento: "2000-01-01"
                });
                navigate("/");
            }
        } catch (e) {
            // El error ya se gestiona en authError del contexto,
            // pero el catch evita que la app crashee.
            console.error("Error en operación de auth", e);
        }
    };

    return (
        <section className="section active auth-section">
            <div className="container auth-layout">
                <div className="auth-card">
                    <h2 className="section-title">
                        {isLogin ? "Iniciar Sesión" : "Registro de Usuario"}
                    </h2>
                    <p className="auth-subtitle">
                        {isLogin
                            ? "Ingresa con tu correo y contraseña para ver tus descuentos."
                            : "Crea tu cuenta para acceder a beneficios exclusivos."}
                    </p>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {/* Campo extra para Registro Real */}
                        {!isLogin && (
                            <label className="form-field">
                                <span>Nombre Completo</span>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder="Juan Pérez"
                                    required={!isLogin}
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
                                placeholder="usuario@gmail.com"
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

                        {/* Mostrar errores locales o errores que vienen de la API (AuthContext) */}
                        {(localError || authError) && (
                            <p className="form-error">{localError || authError}</p>
                        )}

                        <button
                            type="submit"
                            className="btn-primary auth-submit-btn"
                            disabled={isLoading} // Feedback visual de carga
                        >
                            {isLoading ? "Procesando..." : (isLogin ? "Entrar" : "Registrarme")}
                        </button>

                        <div className="auth-switch">
                            {isLogin ? (
                                <span>
                                    ¿No tienes cuenta? <Link to="/registro" className="auth-link">Crear una cuenta</Link>
                                </span>
                            ) : (
                                <span>
                                    ¿Ya tienes cuenta? <Link to="/login" className="auth-link">Inicia sesión</Link>
                                </span>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}