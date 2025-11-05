// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import { CheckService } from './config/check.service';

@Module({
  imports: [
    // ConfigModule debe estar aquí y ser global
    ConfigModule.forRoot({ isGlobal: true }),
    // Importa tu DatabaseModule que contiene TypeORM
    DatabaseModule,
  ],
  controllers: [],
  providers: [CheckService],
})
export class AppModule {}
