// app/routes/users.tsx
import type { Route } from "./+types/users";
import  { Typography, Table, Tag } from "antd";
import { USERS } from "../../src/data/users";

const { Title } = Typography;

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Usuarios - Panel" },
        {
            name: "description",
            content: "Listado de usuarios registrados.",
        },
    ];
}

export default function Users() {
    return (
        <main className="pt-16 p-4 container mx-auto">
            <Title level={2} className="mb-6 text-center">
                Usuarios registrados
            </Title>

            <Table
                rowKey="id"
                dataSource={USERS}
                pagination={false}
                columns={[
                    { title: "ID", dataIndex: "id" },
                    { title: "Nombre", dataIndex: "nombre" },
                    { title: "Correo", dataIndex: "correo" },
                    {
                        title: "Rol",
                        dataIndex: "rol",
                        render: (rol: string) => (
                            <Tag color={rol === "admin" ? "red" : "blue"}>{rol}</Tag>
                        ),
                    },
                ]}
            />
        </main>
    );
}
