import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]), // Registrar el repositorio de Role
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService], // Exportar el servicio para que pueda ser usado por otros módulos
})
export class RolesModule {}
