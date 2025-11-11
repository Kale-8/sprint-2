import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filter-ManejoErrores/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);  // Puerto configurable con variable de entorno
  app.useGlobalFilters(new GlobalExceptionFilter()); // ⛑️ Aquí se activa el manejo global de errores(FILTER)

}
bootstrap();

