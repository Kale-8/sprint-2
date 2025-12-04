import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpAllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { TimingInterceptor } from './common/interceptors/timing.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpAllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor(), new TimingInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Riwi SportsLine API')
    .setDescription('API documentation with multiple authentication methods')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'bearer',
    )
    .addApiKey(
      { type: 'apiKey', name: 'x-api-key', in: 'header' },
      'api-key',
    )
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
            scopes: {
              'profile': 'View your profile',
              'email': 'View your email address',
            },
          },
        },
      },
      'google-oauth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
