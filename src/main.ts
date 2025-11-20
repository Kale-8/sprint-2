import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedRoles } from '../src/database/role.seed';
import { seedTotales } from './database/seed';
import { GlobalExceptionFilter } from './filter-ManejoErrores/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import dataSource from 'data-source';


async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Crear la aplicación NestJS

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

