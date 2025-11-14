import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions, } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';

const entities = [User];

export default class TypeOrmConfig {
  static getOrmConfig(config: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: config.get('DB_HOST', 'localhost'),
      port: +config.get('DB_PORT', 5432),
      username: config.get('DB_USERNAME', 'postgres'),
      password: config.get('DB_PASSWORD', 'postgres'),
      database: config.get('DB_DATABASE', 'sportline2'),
      entities: entities,
      synchronize: config.get('NODE_ENV') !== 'production',
      logging: true,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> =>
    TypeOrmConfig.getOrmConfig(config),
  inject: [ConfigService],
};