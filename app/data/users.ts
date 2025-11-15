// src/data/users.ts

export interface User {
    id: string;
    nombre: string;
    correo: string;
    rol: "cliente" | "admin";
}

export const USERS: User[] = [
    {
        id: "1",
        nombre: "Nicolás Fonseca",
        correo: "nico@example.com",
        rol: "admin",
    },
    {
        id: "2",
        nombre: "Daiyana",
        correo: "daiyana@example.com",
        rol: "cliente",
    },
];
