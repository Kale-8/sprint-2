import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [
        ConfigModule,  // Importa primero tu ConfigModule
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',  // o 'mysql', 'mariadb', etc.
                host: configService.get<string>('database.host'),
                port: configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>('database.database'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: configService.get<boolean>('database.synchronize'),
                logging: configService.get<boolean>('database.logging'),
            }),
        }), UsersModule,
    ],
})
export class AppModule {}