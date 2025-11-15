import React from "react";
import { Form, Typography } from "antd";
import { Input } from "~/components/atoms/Input";
import { PasswordInput } from "~/components/atoms/PasswordInput";
import { Button } from "~/components/atoms/Button";

const { Title, Paragraph } = Typography;

type AuthMode = "login" | "register" | "forgot";

interface AuthFormProps {
    mode: AuthMode;
    onSubmit?: (values: any) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit }) => {
    const [form] = Form.useForm();

    const titles: Record<AuthMode, string> = {
        login: "Iniciar sesión",
        register: "Crear cuenta",
        forgot: "Recuperar contraseña",
    };

    const descriptions: Record<AuthMode, string> = {
        login: "Ingresa con tu correo y contraseña para continuar.",
        register: "Crea una cuenta para hacer tus pedidos más rápido.",
        forgot:
            "Ingresa tu correo y te enviaremos instrucciones para recuperar tu contraseña.",
    };

    const submitLabel: Record<AuthMode, string> = {
        login: "Entrar",
        register: "Registrarme",
        forgot: "Enviar enlace de recuperación",
    };

    const handleFinish = (values: any) => {
        // Por ahora, solo log y callback
        console.log(`[AuthForm:${mode}] values:`, values);
        if (onSubmit) onSubmit(values);
    };

    return (
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
            <Title level={2} className="mb-2 text-center">
                {titles[mode]}
            </Title>
            <Paragraph className="mb-6 text-center">{descriptions[mode]}</Paragraph>

            <Form layout="vertical" form={form} onFinish={handleFinish}>
                {/* Campos compartidos */}
                {(mode === "login" || mode === "register" || mode === "forgot") && (
                    <Form.Item
                        name="email"
                        label="Correo electrónico"
                        rules={[
                            { required: true, message: "Ingresa tu correo" },
                            { type: "email", message: "Ingresa un correo válido" },
                        ]}
                    >
                        <Input placeholder="ej: correo@ejemplo.com" />
                    </Form.Item>
                )}

                {mode === "register" && (
                    <Form.Item
                        name="nombre"
                        label="Nombre completo"
                        rules={[{ required: true, message: "Ingresa tu nombre" }]}
                    >
                        <Input placeholder="Tu nombre" />
                    </Form.Item>
                )}

                {mode === "login" || mode === "register" ? (
                    <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[{ required: true, message: "Ingresa tu contraseña" }]}
                    >
                        <PasswordInput placeholder="Contraseña" />
                    </Form.Item>
                ) : null}

                {mode === "register" && (
                    <Form.Item
                        name="confirmPassword"
                        label="Confirmar contraseña"
                        dependencies={["password"]}
                        rules={[
                            { required: true, message: "Confirma tu contraseña" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("Las contraseñas no coinciden")
                                    );
                                },
                            }),
                        ]}
                    >
                        <PasswordInput placeholder="Repite tu contraseña" />
                    </Form.Item>
                )}

                <Form.Item className="mt-4">
                    <Button type="primary" htmlType="submit" block>
                        {submitLabel[mode]}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
