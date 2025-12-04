// src/modules/usuarios/usuarios.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from '../services/usuario.service';
import { CreateUsuarioDto } from '../dto/create.usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/decorators/roles.guard';

@Controller('users')
@UseGuards(RolesGuard) 
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Solo ADMIN puede ver todos los usuarios
  @Get()
  @Roles('admin')
  findAll() {
    return this.usuariosService.findAll();
  }

  // Admin y empleado pueden ver uno
  @Get(':id')
  @Roles('admin', 'empleado')
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(id);
  }

  // Solo admin crea
  @Post()
  @Roles('admin')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  // Admin o empleado pueden modificar
  @Put(':id')
  @Roles('admin', 'empleado')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  // Solo admin elimina
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.usuariosService.remove(id);
  }
}

