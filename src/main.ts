import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ecommerce Nike API')
    .setDescription('API de Ecommerce Nike con todas las autenticaciones')
    .setVersion('1.0')

    // JWT
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )

    // x-api-key
    .addApiKey(
      { type: 'apiKey', name: 'x-api-key', in: 'header' },
      'API_KEY',
    )

    // OAuth2 (Google)
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl: 'http://localhost:3009/auth/google',
            tokenUrl: 'http://localhost:3009/auth/google/callback',
            scopes: {},
          },
        },
      },
      'GoogleOAuth2',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3009);
  console.log('Api Corriendo en http://localhost:3009/api')
}
bootstrap();
