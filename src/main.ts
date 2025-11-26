import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ResponseTimeInterceptor } from './common/interceptors/response-time.interceptor';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    })
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new ResponseTimeInterceptor()
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Riwi SportsLine API')
    .setDescription('Documentación oficial del backend del ecommerce Riwi SportsLine')
    .setVersion('1.0.0')
    .addBearerAuth() // JWT
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
      },
      'x-api-key',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, swaggerDocument);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);

  console.log('----------------------------------------------');
  console.log(`🚀  Application is running on: http://localhost:${port}`);
  console.log(`📘  Swagger Docs available at: http://localhost:${port}/api/docs`);
  console.log('----------------------------------------------');
}
bootstrap();