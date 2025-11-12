// src/modules/usuarios/usuarios.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsuariosService } from '../services/usuario.service';
import { CreateUsuarioDto } from '../dto/create.usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

@Controller('users')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(id);
  }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuariosService.remove(id);
  }
}
