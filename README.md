# Ecommerce Nike API

![NestJS](https://img.shields.io/badge/NestJS-11.0.1-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0-blue)
![Coverage](https://img.shields.io/badge/Coverage-80%25-yellow)
![License](https://img.shields.io/badge/License-UNLICENSED-lightgrey)

## Descripción

API de ecommerce Nike desarrollada en **NestJS**, con:

- Autenticación avanzada: JWT, Refresh Token, x-api-key y OAuth2 (Google)
- Roles y permisos gestionados desde la base de datos
- Gestión de usuarios, productos, pedidos y clientes
- Middleware de logging, guards personalizados y manejo de errores global
- Documentación Swagger completa
- Pruebas unitarias y de integración
- Pre-commit hooks con Husky, ESLint y Prettier
- Integración con SonarQube para análisis de calidad de código

---

## Tecnologías

- **Backend:** NestJS, TypeScript, Passport, JWT  
- **Base de datos:** PostgreSQL  
- **ORM:** TypeORM  
- **Autenticación externa:** OAuth2 Google, API Key  
- **Testing:** Jest, Supertest  
- **Calidad de código:** ESLint, Prettier, Husky, lint-staged  
- **Documentación:** Swagger  
- **Análisis de código:** SonarQube  

---

## Instalación

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_PROYECTO>
npm install 

Configurar variables de entorno:

Crea un archivo .env en la raíz con las siguientes variables:

PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=ecommerce
JWT_SECRET=tu_jwt_secret
JWT_EXPIRES_IN=3600s
JWT_REFRESH_SECRET=tu_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
API_KEY=tu_api_key


Base de datos

Asegúrate de tener PostgreSQL corriendo.

Configura tu conexión en config/database.module.ts.

Ejecuta migraciones (si tienes):

npm run typeorm:migration:run

Ejecución de la aplicación

Modo desarrollo:

npm run start:dev


Modo producción:

npm run build
npm start


La API estará disponible en http://localhost:3000.

Documentación Swagger

La documentación de la API se encuentra en:

http://localhost:3000/api


Incluye:

Endpoints de autenticación JWT, Refresh Token, OAuth2, API Key

Endpoints de usuarios, productos, pedidos y clientes

DTOs y modelos de respuesta

Ejemplos de errores

Autenticación
JWT + Refresh Token

POST /auth/login → obtiene JWT y refresh token

POST /auth/refresh → renueva JWT con refresh token

Protege rutas con @UseGuards(JwtAuthGuard) y RolesGuard

x-api-key

Se protege cualquier endpoint con @UseGuards(ApiKeyAuthGuard)

Requiere enviar x-api-key en el header.

OAuth2 Google

GET /auth/google → login con Google

GET /auth/google/callback → callback

Configura correctamente GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET y GOOGLE_CALLBACK_URL