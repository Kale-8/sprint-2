import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

// Aca estamos importando el ConfigModule para manejar variables de entorno
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // otros módulos
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


