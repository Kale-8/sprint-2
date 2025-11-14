// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './typeorm/typeorm.config';
// import UsersModule from './modules/users/users.module'; // cuando exista

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    // UsersModule,
  ],
})
export class AppModule {}
