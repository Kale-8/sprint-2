import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { Role } from '../../modules/roles/entities/role.entity';
import { Order } from '../../modules/orders/entities/order.entity';
import { Client } from '../../modules/clients/entities/client.entity';
import { OrderItem } from '../../modules/orders/entities/order-item.entity';
import { Product } from '../../modules/products/entities/product.entity';
import { userSeed } from './user.seed';
import { productSeed } from './product.seed';
import { clientSeed } from './client.seed';
import { orderSeed } from './order.seed';

async function run() {
  // Crear una nueva conexión
  const dataSource = new DataSource({
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
    synchronize: false,
    logging: true,
    entitySkipConstructor: true,
    entityPrefix: '',
    migrations: [],
    subscribers: [],
  });

  try {
    // Inicializar la conexión
    await dataSource.initialize();
    console.log('Data Source has been initialized!');
    
    // Ejecutar seeds en orden
    await userSeed(dataSource);
    await productSeed(dataSource);
    await clientSeed(dataSource);
    await orderSeed(dataSource);
    
    console.log('Seeds executed successfully!');
  } catch (err) {
    console.error('Error during Data Source initialization', err);
  } finally {
    // Cerrar la conexión
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('Data Source has been closed!');
    }
  }
}

run().catch(console.error);
