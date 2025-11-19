import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/https-exception.filter'; 
import { LoggerMiddleware } from './common/middlewares/logger.middleware'; // opcional si ya lo tienes

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //  Pipes globales para validación y transformación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // elimina propiedades que no estén en el DTO
      forbidNonWhitelisted: true,   // lanza error si mandan propiedades desconocidas
      transform: true,              // convierte el body al tipo del DTO
    }),
  );

  
  app.useGlobalFilters(new GlobalExceptionFilter());

  //  
  // app.useGlobalInterceptors(new LoggingInterceptor());

  //  Swagger
  const config = new DocumentBuilder()
    .setTitle('Nike Store API') // puedes cambiarlo si quieres
    .setDescription('API para gestionar usuarios, productos y pedidos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  await app.listen(process.env.PORT || 3007);
  console.log(`Servidor corriendo en http://localhost:3007/api`);
}

bootstrap();
