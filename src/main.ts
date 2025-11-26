import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedRoles } from '../src/database/role.seed';
import { seedTotales } from './database/seed';
import { GlobalExceptionFilter } from './filter-ManejoErrores/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import dataSource from 'data-source';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';



//Aca implemento el Swagger con dos tipos de autenticacion: JWT y API Key
//En la parte superior de Swagger aparecerán dos opciones de seguridad:
//JWT → donde puedes poner tu token.
//API Key → donde puedes poner tu x-api-key
const config = new DocumentBuilder()
  .setTitle('API Riwi-Sportsline') // Título de tu API
  .setDescription('Documentación Swagger con autenticación JWT y api-Key') // Descripción
  .setVersion('1.0') // Versión
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    },
    'jwt-authSw', // Este nombre lo usaremos en los decoradores
  )
  .addApiKey(
    {
      type: 'apiKey',
      name: 'x-api-key', // nombre del header
      in: 'header',
    },
    'api-key-authSw', // nombre del esquema para usar en decoradores
  )
.build();
  


async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Crear la aplicación NestJS
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Ruta donde se verá Swagger    (http://localhost:3000/api)

  const dataSource = app.get(DataSource); 

  // 🌱 Ejecutar seeders antes de levantar el servidor
  await seedRoles(dataSource);     // Primero roles
  await seedTotales(dataSource);   // Luego el resto (usuarios, clientes, productos, pedidos)

  app.useGlobalFilters(new GlobalExceptionFilter()); // ⛑️ Aquí se activa el manejo global de errores(FILTER)
  app.useGlobalInterceptors(new LoggingInterceptor()); // 📋 Aquí se activa el interceptor global de logs(INTERCEPTOR) muestra cuanto tardo en ejecutar la peticion.

  await app.listen(process.env.PORT ?? 3000);  // Puerto configurable con variable de entorno
  console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT ?? 3000}`);
}

bootstrap();





