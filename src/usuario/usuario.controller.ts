import { Controller, Post, Body, Get, UseFilters, UseGuards, Req } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './create-usuario.dto';
import { GlobalExceptionFilter } from '../filter-ManejoErrores/http-exception.filter';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../guards/roles.decorator';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@UseFilters(GlobalExceptionFilter)
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard) //  Protegido por JWT y roles
  @Roles('admin') // Solo admins pueden crear usuarios
  create(@Body() dto: CreateUsuarioDto, @Req() req: Request) {
      return this.usuarioService.create(dto);
  }

  @Get()
  findAll() {
      return this.usuarioService.findAll();
  }
}