import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filter-ManejoErrores/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Crear la aplicación NestJS
  await app.listen(process.env.PORT ?? 3000);  // Puerto configurable con variable de entorno
  app.useGlobalFilters(new GlobalExceptionFilter()); // ⛑️ Aquí se activa el manejo global de errores(FILTER)
  app.useGlobalInterceptors(new LoggingInterceptor()); // 📋 Aquí se activa el interceptor global de logs(INTERCEPTOR) muestra cuanto tardo en ejecutar la peticion.

}
bootstrap();

