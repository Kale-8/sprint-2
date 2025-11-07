import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [configuration.KEY],
            useFactory: (config: ConfigType<typeof configuration>) => {
                return {
                    type: 'postgres',
                    url: config.database.url,
                    autoLoadEntities: true,
                    synchronize: true, // Solo en desarrollo
                    ssl: config.environment === 'production',
                };
            },
        }),
    ],
})
export class DatabaseModule {}
