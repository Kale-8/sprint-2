import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import { CheckService } from './config/check.service';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ProductosModule } from './modules/productos/productos.module';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { ClientesModule } from './modules/clientes/clientes.module';

@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),
   
    DatabaseModule,
    UsuariosModule,
    ProductosModule, // 
    PedidosModule,   // 
    ClientesModule,
  ],
  controllers: [],
  providers: [CheckService],
})
export class AppModule {}
