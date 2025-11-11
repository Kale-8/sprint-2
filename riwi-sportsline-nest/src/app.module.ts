import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { Client } from './clients/client.entity';
import { Order } from './orders/order.entity';
import { OrderItem } from './orders/order-item.entity';
import { UsersService } from './users/users.service';
import { ProductsService } from './products/products.service';
import { ClientsService } from './clients/clients.service';
import { OrdersService } from './orders/orders.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URI'),
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
      }),
    }),
    TypeOrmModule.forFeature([User, Product, Client, Order, OrderItem]),
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, ProductsService, ClientsService, OrdersService],
})
export class AppModule {}
