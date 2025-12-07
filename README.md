# Pastelería Mil Sabores (pasteleria-aev3)

## 1. Introducción

**Pastelería Mil Sabores** es una aplicación web full-stack que simula una plataforma de e-commerce para una pastelería. El proyecto está construido sobre un stack moderno basado en **React**, **Vite** y **TypeScript**, y utiliza **React Router** para la gestión de rutas y renderizado del lado del servidor (SSR).

La aplicación ofrece una experiencia de usuario completa, desde la exploración de productos y la gestión de un carrito de compras, hasta funcionalidades de autenticación simulada y un panel de administración básico.

## 2. Características Principales

- **Catálogo de Productos:** Interfaz para visualizar productos con detalles, precios e imágenes, con funcionalidades de filtrado por categoría y búsqueda.
- **Carrito de Compras:** Gestión de estado del carrito persistente en `LocalStorage` a través de React Context.
- **Autenticación (Mock):** Formularios de inicio de sesión, registro y recuperación de contraseña.
- **Panel de Administración:** Vista simple para listar usuarios registrados, implementada con Ant Design.
- **Renderizado del Lado del Servidor (SSR):** Configurado para mejorar el rendimiento y el SEO.
- **Diseño Responsivo:** Adaptable a diferentes dispositivos mediante el uso de CSS media queries.
- **Blog:** Sección de artículos con capacidad de filtrado por categorías.

## 3. Stack Tecnológico

- **Framework Principal:** [React](https://react.dev/)
- **Enrutamiento y SSR:** [React Router](https://reactrouter.com/) (v7+)
- **Bundler y Servidor de Desarrollo:** [Vite](https://vitejs.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Librería de UI:** [Ant Design (AntD)](https://ant.design/)
- **Estilos:**
  - [TailwindCSS](https://tailwindcss.com/): Para utilidades y layout.
  - **CSS Nativas:** Para estilos y personalización de componentes.
- **Cliente HTTP:** [Axios](https://axios-http.com/)
- **Contenerización:** [Docker](https://www.docker.com/)

## 4. Variables de Entorno

Para el correcto funcionamiento de la aplicación, es necesario crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Ejemplo de variable de entorno
VITE_API_URL = http://localhost:3000/api/v1
```

**Nota:** Reemplaza los valores de ejemplo con las configuraciones específicas de tu entorno de desarrollo o producción.

## 5. Instalación y Ejecución Local

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v20 o superior)
- [npm](https://www.npmjs.com/) (v10 o superior)

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd pasteleria-aev3
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`.

## 6. Scripts Disponibles

El archivo `package.json` incluye los siguientes scripts:

- `npm run dev`: Inicia el servidor de desarrollo con Hot Module Replacement (HMR).
- `npm run build`: Compila y empaqueta la aplicación para producción en el directorio `build/`.
- `npm run start`: Ejecuta el servidor de producción (`react-router-serve`). Requiere una compilación previa (`npm run build`).
- `npm run typecheck`: Valida los tipos de TypeScript en todo el proyecto.

## 7. Despliegue con Docker

El proyecto está configurado para ser desplegado utilizando Docker, gracias a un `Dockerfile` multi-etapa que optimiza el tamaño de la imagen final.

1. **Construir la imagen Docker:**
   ```bash
   docker build -t pasteleria-aev3 .
   ```

2. **Ejecutar el contenedor:**
   ```bash
   docker run -p 3000:3000 pasteleria-aev3
   ```
   La aplicación estará accesible en `http://localhost:3000`.
