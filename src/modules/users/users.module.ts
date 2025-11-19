import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Esto permite inyectar el repositorio de User
    RolesModule, // Importar RolesModule para poder usar el servicio de roles
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule], // Exportar el servicio y TypeOrmModule
})
export class UsersModule {}
