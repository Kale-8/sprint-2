import { Controller, Post, Body, Get, UseFilters, UseGuards, Req } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './create-usuario.dto';
import { GlobalExceptionFilter } from '../filter-ManejoErrores/http-exception.filter';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../guards/roles.decorator';
import type { Request } from 'express';
import { Usuario } from './usuario.entity';

@UseFilters(GlobalExceptionFilter)
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
    @UseGuards(RolesGuard)
    @Roles('admin') // 👈 Solo admins pueden crear clientes
    create(@Body() dto: CreateUsuarioDto, @Req() req: Request) {
        //req.user = { role: 'admin' }; // 👈 Simulación temporal (esto lo hará JWT en producción)
        return this.usuarioService.create(dto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }
}