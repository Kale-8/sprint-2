import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import { CheckService } from './config/check.service';

import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ProductosModule } from './modules/productos/productos.module';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { ClientesModule } from './modules/clientes/clientes.module';

import { validationSchema } from './config/validation';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ApiKeyModule } from './modules/auth/api-key.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),

    DatabaseModule,
    UsuariosModule,
    ProductosModule,
    PedidosModule,
    ClientesModule,
    ApiKeyModule,
    AuthModule
    
  ],
  controllers: [],
  providers: [CheckService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); 
  }
}
