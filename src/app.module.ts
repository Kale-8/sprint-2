// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './database/typeorm.config';
import { ProductsModule } from './modules/products/products.module';
import { ClientsModule } from './modules/clients/clients.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RolesModule } from './modules/roles/roles.module';
// import UsersModule from './modules/users/users.module'; // cuando exista

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ProductsModule,
    ClientsModule,
    OrdersModule,
    RolesModule,
    // UsersModule,
  ],
})
export class AppModule {}
