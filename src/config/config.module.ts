import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
    imports: [
        NestConfigModule.forRoot({
            load: [configuration],        // Carga tu función de configuración
            isGlobal: true,               // Hace ConfigService disponible en toda la app
            cache: true,                  // Opcional: cachea los valores
            expandVariables: true,        // Opcional: permite interpolación de variables
            envFilePath: '.env',          // Opcional: especifica ruta del .env
        }),
    ],
})
export class ConfigModule {}