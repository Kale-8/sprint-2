# Riwi SportsLine - NestJS Backend API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  API REST para e-commerce deportivo construida con NestJS, TypeORM y PostgreSQL.
  <br/>
  Implementa autenticación avanzada (JWT, API Keys, OAuth2), autorización basada en roles y permisos, y documentación completa con Swagger.
</p>

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Pruebas](#pruebas)
- [Documentación API](#documentación-api)
- [Autenticación](#autenticación)
- [Base de Datos](#base-de-datos)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Licencia](#licencia)

---

## 📖 Descripción

**Riwi SportsLine** es una API REST moderna para un e-commerce deportivo, desarrollada con **NestJS** y **TypeORM**. 

El proyecto implementa:
- ✅ **3 métodos de autenticación**: JWT, API Keys, OAuth2 (Google)
- ✅ **Autorización granular**: Roles y permisos desde base de datos
- ✅ **Documentación completa**: Swagger/OpenAPI
- ✅ **Calidad de código**: ESLint, Prettier, Husky, SonarQube
- ✅ **Tests**: Unitarios y E2E con Jest

---

## ✨ Características

### Autenticación y Autorización
- **JWT Authentication**: Access tokens y refresh tokens
- **API Key Authentication**: Para integraciones M2M con validación de scopes
- **OAuth2 (Google)**: Login social con vinculación de cuentas
- **Roles dinámicos**: Admin, Vendedor (desde BD)
- **Permisos granulares**: 16 permisos configurables
- **Guards personalizados**: JwtAuthGuard, ApiKeyGuard, RolesGuard, PermissionsGuard, ScopesGuard

### Gestión de Recursos
- **Usuarios**: CRUD completo con roles y permisos
- **Productos**: Gestión de inventario deportivo
- **Clientes**: Administración de clientes
- **API Keys**: Gestión de claves para integraciones externas

### Calidad y Documentación
- **Swagger UI**: Documentación interactiva en `/api`
- **Validación automática**: DTOs con class-validator
- **Interceptores**: Transformación de respuestas y logging de tiempos
- **Filtros de excepciones**: Manejo centralizado de errores
- **Pre-commit hooks**: Linting y formateo automático

---

## 🛠 Tecnologías

### Core
- **[NestJS](https://nestjs.com/)** v11 - Framework Node.js progresivo
- **[TypeScript](https://www.typescriptlang.org/)** v5.7 - Superset tipado de JavaScript
- **[TypeORM](https://typeorm.io/)** v0.3 - ORM para TypeScript

### Base de Datos
- **[PostgreSQL](https://www.postgresql.org/)** - Base de datos relacional

### Autenticación
- **[Passport](http://www.passportjs.org/)** - Middleware de autenticación
- **[JWT](https://jwt.io/)** - JSON Web Tokens
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Hashing de contraseñas

### Documentación
- **[Swagger/OpenAPI](https://swagger.io/)** - Documentación de API

### Calidad de Código
- **[ESLint](https://eslint.org/)** - Linter de JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formateador de código
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[Jest](https://jestjs.io/)** - Framework de testing

---

## 📦 Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **PostgreSQL** >= 14.x

---

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd sprint-2
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:
```env
NODE_ENV=development
PORT=3000
DATABASE_URI=db_uri

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRES_IN=7d

# OAuth2 Google (opcional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

4. **Ejecutar seeders** (opcional - datos de prueba)
```bash
npm run db:seed
```

---

## ⚙️ Configuración

### Base de Datos

El proyecto usa **TypeORM** con PostgreSQL. La configuración está en `data-source.ts`.

**Modo desarrollo**: `synchronize: true` (sincroniza automáticamente el esquema)  
**Modo producción**: Usar migraciones

### Seeders

Los seeders crean datos de prueba:
- 4 usuarios (admin, vendedor)
- 2 roles con permisos
- 3 API keys
- 5 productos

```bash
npm run db:seed
```

---

## 🏃 Ejecución

### Desarrollo
```bash
npm run start:dev
```
Servidor en modo watch en `http://localhost:3000`

### Producción
```bash
npm run build
npm run start:prod
```

### Debug
```bash
npm run start:debug
```

---

## 🧪 Pruebas

### Tests Unitarios
```bash
npm run test
```

### Tests en modo watch
```bash
npm run test:watch
```

### Coverage
```bash
npm run test:cov
```

### Tests E2E
```bash
npm run test:e2e
```

---

## 📚 Documentación API

### Swagger UI
Accede a la documentación interactiva:
```
http://localhost:3000/api
```

### Swagger JSON
```
http://localhost:3000/api-json
```

### Características de Swagger
- ✅ 3 métodos de autenticación configurados
- ✅ Todos los endpoints documentados
- ✅ DTOs con ejemplos y validaciones
- ✅ Códigos de respuesta documentados
- ✅ Probador interactivo "Try it out"

---

## 🔐 Autenticación

El proyecto soporta **3 métodos de autenticación**:

### 1. JWT (Bearer Token)

**Login:**
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "admin@sportsline.com",
  "password": "admin123"
}
```

**Respuesta:**
```json
{
  "data": {
    "accessToken": "XXXXXXXXX...",
    "refreshToken": "XXXXXXXXX..."
  }
}
```

**Uso:**
```bash
GET /users
Authorization: Bearer <accessToken>
```

### 2. API Key (x-api-key)

**Uso:**
```bash
GET /products
x-api-key: sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

> **Nota**: Ejecuta `npm run db:seed` para generar API keys de prueba. Las keys se mostrarán en la consola.

**Scopes disponibles:**
- `products:read`, `products:write`
- `clients:read`, `clients:write`
- `orders:read`, `orders:write`

### 3. OAuth2 (Google)

**Iniciar login:**
```
GET /auth/google
```

**Callback:**
```
GET /auth/google/callback
```

Retorna JWT tokens tras autenticación exitosa.

---

## 🗄️ Base de Datos

### Entidades

#### Usuarios (`usuarios`)
- Campos: id, nombre, email, passwordHash, rol, googleId, avatar, provider
- Relaciones: Many-to-Many con Roles

#### Roles (`roles`)
- Campos: id, nombre, descripcion
- Relaciones: Many-to-Many con Users y Permissions

#### Permisos (`permissions`)
- Campos: id, nombre, descripcion, recurso, accion
- Relaciones: Many-to-Many con Roles

#### API Keys (`api_keys`)
- Campos: id, nombre, keyHash, scopes, activa, expiraEn, ultimoUso
- Relaciones: Many-to-One con User (creador)

#### Productos (`products`)
- Campos: id, codigo, nombre, precio, stock

#### Clientes (`clients`)
- Campos: id, nombre, email, telefono

### Diagrama de Relaciones
```
usuarios ←→ user_roles ←→ roles ←→ role_permissions ←→ permissions
usuarios ← api_keys
```

---

## 📜 Scripts Disponibles

### Desarrollo
```bash
npm run start          # Iniciar servidor
npm run start:dev      # Modo watch
npm run start:debug    # Modo debug
npm run build          # Compilar proyecto
```

### Tests
```bash
npm run test           # Tests unitarios
npm run test:watch     # Tests en modo watch
npm run test:cov       # Coverage
npm run test:e2e       # Tests E2E
```

### Calidad de Código
```bash
npm run lint           # Ejecutar ESLint
npm run format         # Ejecutar Prettier
```

### Base de Datos
```bash
npm run db:seed        # Ejecutar seeders
```

---

## 📁 Estructura del Proyecto

```
sprint-2/
├── src/
│   ├── auth/                    # Módulo de autenticación
│   │   ├── dto/                 # DTOs de auth
│   │   ├── entities/            # Entidades (Role, Permission, ApiKey)
│   │   ├── guards/              # Guards de autenticación
│   │   ├── strategies/          # Estrategias Passport
│   │   ├── auth.controller.ts   # Controlador de auth
│   │   ├── auth.service.ts      # Servicio de auth
│   │   └── auth.module.ts       # Módulo de auth
│   ├── users/                   # Módulo de usuarios
│   ├── products/                # Módulo de productos
│   ├── clients/                 # Módulo de clientes
│   ├── common/                  # Recursos compartidos
│   │   ├── decorators/          # Decoradores personalizados
│   │   ├── filters/             # Filtros de excepciones
│   │   ├── guards/              # Guards compartidos
│   │   └── interceptors/        # Interceptores
│   ├── seeds/                   # Seeders de base de datos
│   ├── app.module.ts            # Módulo principal
│   └── main.ts                  # Punto de entrada
├── test/                        # Tests E2E
├── .env                         # Variables de entorno
├── .env.example                 # Ejemplo de variables
├── .husky/                      # Git hooks
├── data-source.ts               # Configuración TypeORM
├── sonar-project.properties     # Configuración SonarQube
├── package.json                 # Dependencias y scripts
└── README.md                    # Este archivo
```

---

## 👥 Credenciales de Prueba

### Usuarios
```
Admin:
  Email: admin@sportsline.com
  Password: admin123
  
Vendedor:
  Email: vendedor@sportsline.com
  Password: vendedor123
```

### API Keys

> **Importante**: Las API keys se generan al ejecutar `npm run db:seed`. Las keys en texto plano se muestran **solo una vez** en la consola.

```
Test (Full Access):
  sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  Scopes: products:*, orders:*
  
Read-Only:
  sk_readonly_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  Scopes: products:read, clients:read, orders:read
  
Temporary (30 días):
  sk_temp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  Scopes: products:read
```

**Para obtener las keys reales:**
```bash
npm run db:seed
# Las keys se mostrarán en la salida del comando
```

---

## 🔧 Herramientas de Calidad

### ESLint
Configurado en `eslint.config.mjs` con reglas de TypeScript.

### Prettier
Configurado en `.prettierrc` con:
- Single quotes
- Trailing commas

### Husky
Pre-commit hook ejecuta automáticamente:
- ESLint con auto-fix
- Prettier

### SonarQube
Configurado en `sonar-project.properties` para análisis de calidad.

---