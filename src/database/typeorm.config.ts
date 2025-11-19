import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions, } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Role } from '../modules/roles/entities/role.entity';
import { Order } from '../modules/orders/entities/order.entity';
import { Client } from '../modules/clients/entities/client.entity';
import { OrderItem } from '../modules/orders/entities/order-item.entity';
import { Product } from '../modules/products/entities/product.entity';

const entities = [User, Role, Order, Client, OrderItem, Product];

export default class TypeOrmConfig {
  static getOrmConfig(config: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: config.get('database.host', 'localhost'),
      port: +config.get('database.port', 5432),
      username: config.get('database.user', 'postgres'),
      password: config.get('database.pass', 'postgres'),
      database: config.get('database.name', 'riwi_dev'),

      entities: entities,
      autoLoadEntities: true,
      synchronize: false,

      migrations: ['dist/database/migrations/*.js'],
      migrationsRun: false,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> =>
    TypeOrmConfig.getOrmConfig(config),
  inject: [ConfigService],
};