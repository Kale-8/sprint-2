import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Client } from '../clients/entities/client.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Client, User, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
