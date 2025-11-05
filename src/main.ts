import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));


const config = new DocumentBuilder()
.setTitle('Task Manager API') 
.setDescription('API para gestionar tareas')
.setVersion('1.0')
.addBearerAuth()
.build();


const doc = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/api', app, doc);

app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // lanza error si mandan propiedades desconocidas
      transform: true, // convierte el body al tipo del DTO
    }),
  );


await app.listen(process.env.PORT || 3003);
}
bootstrap();