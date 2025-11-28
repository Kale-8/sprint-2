import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]), //RFegistro de la entidad Usuario en TypeORM para la inyeccion.
    RoleModule,
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}
