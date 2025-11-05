# 🛒 E-commerce Riwi SportsLine

## Tabla de Contenido

1. [Épica: Migración del e-commerce Riwi SportsLine a NestJS](#épica-migración-del-e-commerce-riwi-sportsline-a-nestjs)  
2. [Semana 1 - Fundamentos de NestJS y migración del setup base](#semana-1---fundamentos-de-nestjs-y-migración-del-setup-base)  
3. [Semana 2 - Integración de ORM y persistencia con TypeORM](#semana-2---integración-de-orm-y-persistencia-con-typeorm)  
4. [Semana 3 - Arquitectura modular y DTOs](#semana-3---arquitectura-modular-y-dtos)  
5. [Semana 4 - Middleware, filtros e interceptores](#semana-4---middleware-filtros-e-interceptores)  
6. [Semana 5 - Autenticación con JWT, roles y permisos desde base de datos](#semana-5---autenticación-con-jwt-roles-y-permisos-desde-base-de-datos)  
7. [Semana 6 - Autenticaciones avanzadas (x-api-key y OAuth)](#semana-6---autenticaciones-avanzadas-x-api-key-y-oauth)  
8. [Semana 7 - Pruebas y análisis estático](#semana-7---pruebas-y-análisis-estático)

---

## Épica: Migración del e-commerce Riwi SportsLine a NestJS

**Descripción:**  
La empresa **Riwi SportsLine** busca evolucionar su arquitectura backend migrando el proyecto desarrollado en **Express** hacia el framework **NestJS**, adoptando principios de modularidad, inyección de dependencias, pruebas automatizadas y mejores prácticas de seguridad.  

El objetivo es que el equipo experimente una migración completa hacia un entorno empresarial **más escalable, mantenible y profesional**, aprovechando el **CLI y arquitectura de NestJS**.

---

## Semana 1 - Fundamentos de NestJS y migración del setup base

**Descripción:**  
Como desarrollador backend quiero comprender la estructura y fundamentos de NestJS, instalando su CLI y migrando la base del proyecto para iniciar la conversión del backend Express hacia la arquitectura modular de Nest.

**Criterios de aceptación:**
- Proyecto creado con **Nest CLI** e inicializado desde el fork de GitHub.  
- Integración de **TypeScript**, **ESLint**, **Prettier** y configuración de entorno (`.env`) bajo buenas prácticas.  
- Migración del setup de conexión a **PostgreSQL** con **TypeORM**.  
- Validación del arranque del servidor con variables configuradas profesionalmente (**ConfigModule**).

**Tareas base de migración:**
1. Crear el nuevo proyecto con `nest new riwi-sportsline` y vincularlo con el fork del repositorio original.  
2. Configurar las variables de entorno (ConfigModule) y migrar las del proyecto Express.  
3. Sustituir Sequelize por **TypeORM** con una entidad base (por ejemplo, Usuario).  
4. Documentar el proceso inicial en el README del nuevo fork.  

---

## Semana 2 - Integración de ORM y persistencia con TypeORM

**Descripción:**  
Como desarrollador quiero usar **TypeORM** para manejar las entidades y relaciones del e-commerce, reemplazando Sequelize y aprovechando los decoradores de entidades de NestJS.

**Criterios de aceptación:**
- Entidades de **Usuario**, **Producto**, **Cliente** y **Pedido** creadas con TypeORM.  
- Relaciones correctamente definidas (`OneToMany`, `ManyToOne`, etc.).  
- Migraciones y seeders implementados con el **CLI de TypeORM**.  
- Repositorios personalizados para operaciones CRUD.  

**Tareas base de migración:**
1. Migrar modelos de Sequelize a entidades de TypeORM.  
2. Configurar relaciones entre entidades.  
3. Implementar migraciones y seeds iniciales.  
4. Validar consultas básicas desde los servicios.  

---

## Semana 3 - Arquitectura modular y DTOs

**Descripción:**  
Como desarrollador necesito estructurar el proyecto bajo una **arquitectura modular** en NestJS, implementando controladores, servicios y **DTOs**, garantizando separación de responsabilidades y manejo profesional de variables de entorno.

**Criterios de aceptación:**
- Creación de módulos de **usuarios**, **productos** y **clientes** usando el CLI de Nest.  
- Uso de DTOs con **class-validator** y **class-transformer**.  
- Configuración robusta de `.env` y validación con **ConfigModule**.  
- Código alineado con principios **SOLID** e inyección de dependencias correctamente implementada.

**Tareas base de migración:**
1. Generar módulos, controladores y servicios de usuario, producto y cliente.  
2. Migrar los DTO existentes en Express al formato compatible con Nest.  
3. Centralizar la configuración de entorno (puerto, DB, claves, etc.).  
4. Actualizar los controladores para usar inyección de dependencias.  
5. Integrar pruebas unitarias.  

---

## Semana 4 - Middleware, filtros e interceptores

**Descripción:**  
Como desarrollador quiero aprovechar el sistema de **middleware**, **exception filters**, **guards**, **interceptors** y **pipes** de NestJS para mejorar la robustez y control del flujo de peticiones.

**Criterios de aceptación:**
- Middleware de logging y validación implementado.  
- Uso de **ExceptionFilter global**.  
- Guards personalizados para roles.  
- Interceptors para formateo de respuestas y medición de tiempo de ejecución.

**Tareas base de migración:**
1. Implementar middleware global de auditoría.  
2. Crear ExceptionFilter para errores HTTP.  
3. Implementar Guards basados en roles y permisos.  
4. Añadir interceptors personalizados (por ejemplo, logging de tiempo).  
5. Integrar pruebas unitarias.  

---

## Semana 5 - Autenticación con JWT, roles y permisos desde base de datos

**Descripción:**  
Como administrador deseo un sistema de autenticación con **JWT + Refresh Token**, donde los roles y permisos provengan de la base de datos y no estén quemados en código.

**Criterios de aceptación:**
- Autenticación y autorización implementadas con **Passport** y **JWT**.  
- Refresh Token funcional.  
- Roles y permisos gestionados desde base de datos.  
- Protección de rutas mediante Guards y decoradores personalizados.  

**Tareas base de migración:**
1. Configurar módulo Auth y estrategias JWT + Refresh Token.  
2. Migrar el sistema de roles y permisos desde Express a BD.  
3. Implementar guards y decoradores para proteger endpoints.  
4. Actualizar documentación Swagger con autenticación.  

---

## Semana 6 - Autenticaciones avanzadas (x-api-key y OAuth)

**Descripción:**  
Como arquitecto de software quiero implementar autenticaciones adicionales mediante **x-api-key** y **OAuth**, permitiendo que sistemas externos se integren de forma segura al e-commerce.

**Criterios de aceptación:**
- Autenticación basada en **x-api-key**.  
- Integración **OAuth2** para login con terceros (por ejemplo, Google).  
- Control de permisos por API key.  
- Documentación completa de flujos de autenticación avanzada.

**Tareas base de migración:**
1. Crear módulo para autenticación x-api-key.  
2. Implementar autenticación OAuth2 (ejemplo: Google).  
3. Agregar validación de scopes y permisos por key.  
4. Documentar nuevos flujos en Swagger.  

---

## Semana 7 - Pruebas y análisis estático

**Descripción:**  
Como líder técnico necesito asegurar la calidad y mantenibilidad del código con **Swagger**, **SonarQube** y linters.

**Criterios de aceptación:**
- Swagger actualizado y documentando DTOs, respuestas y errores.  
- Pruebas de **caja blanca y negra** implementadas (workshop).  
- Análisis de calidad con **SonarQube**.  
- Configuración de linters y **pre-commit hooks** (Husky).

**Tareas base de migración:**
1. Configurar análisis de código estático con SonarQube.  
2. Ejecutar pruebas y validaciones de cobertura.  
3. Implementar Husky/pre-commit para control de calidad.  

---

## 🧭 Resultado Esperado
Al finalizar las siete semanas, el e-commerce **Riwi SportsLine** contará con:
- Backend modular y escalable en **NestJS**.  
- Integración robusta con **TypeORM** y **PostgreSQL**.  
- Sistema completo de autenticación y autorización.  
- Pruebas unitarias y análisis estático de calidad.  
- Documentación técnica y flujos autenticados en **Swagger**.

---

> 🧑‍💻 Proyecto guiado bajo estándares empresariales de NestJS, con enfoque en buenas prácticas, mantenibilidad y escalabilidad.
