import { DataSource } from 'typeorm';
import { User } from './src/modules/users/entities/user.entity';
import { Role } from './src/modules/roles/entities/role.entity';
import { Order } from './src/modules/orders/entities/order.entity';
import { Client } from './src/modules/clients/entities/client.entity';
import { OrderItem } from './src/modules/orders/entities/order-item.entity';
import { Product } from './src/modules/products/entities/product.entity';
import { RefreshToken } from './src/modules/auth/entities/refresh-token.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'riwi_dev',
  entities: [
    User, 
    Role, 
    Order, 
    Client,
    OrderItem,
    Product,
    RefreshToken
  ],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
