import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './src/users/user.entity';
import { Product } from './src/products/product.entity';
import { Client } from './src/clients/client.entity';
import { Order } from './src/orders/order.entity';
import { OrderItem } from './src/orders/order-item.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URI,
  entities: [User, Product, Client, Order, OrderItem],
  migrations: ['src/migrations/*.{ts,js}'],
  synchronize: false,
  logging: false,
});

export default AppDataSource;


