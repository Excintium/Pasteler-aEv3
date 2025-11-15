// src/components/organisms/AuthPanel.tsx
import React from "react";
import { Card } from "antd";
import { AuthForm } from "~/components/molecules/AuthForm";

type AuthMode = "login" | "register" | "forgot";

interface AuthPanelProps {
    mode: AuthMode;
}

export const AuthPanel: React.FC<AuthPanelProps> = ({ mode }) => {
    return (
        <div className="pt-16 p-4 container mx-auto flex justify-center">
            <Card style={{ maxWidth: 480, width: "100%" }}>
                <AuthForm
                    mode={mode}
                    onSubmit={(values) => {
                        // Aquí después conectas al backend (Axios → NestJS)
                        console.log(`Submit ${mode}`, values);
                    }}
                />
            </Card>
        </div>
    );
};
