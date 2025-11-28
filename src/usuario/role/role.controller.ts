import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { Roles } from 'src/guards/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post() //Metodo CRUD POST para crear role nuevo.
  @UseGuards(AuthGuard('jwt'), RolesGuard) //  Protegido por JWT y roles
  @Roles('admin') // Solo admins pueden crear roles
  create(@Body('name') name: string) {
    return this.roleService.create(name);
  }

  @Get() //Metodo CRUD GET para ver todos los roles creados.
  findAll() {
    return this.roleService.findAll();
  }
}
