import { DataSource } from 'typeorm';
import { User } from './src/modules/users/entities/user.entity';
import { Role } from './src/modules/roles/entities/role.entity';
import { Order } from './src/modules/orders/entities/order.entity';
import { Client } from './src/modules/clients/entities/client.entity';
import { OrderItem } from './src/modules/orders/entities/order-item.entity';
import { Product } from './src/modules/products/entities/product.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'sportline2',
  entities: [
    User, 
    Role, 
    Order, 
    Client,
    OrderItem,
    Product
  ],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
