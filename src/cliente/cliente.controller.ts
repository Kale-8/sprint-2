import { Controller, Post, Body, Get, NotFoundException, UseFilters, UseGuards } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './create-cliente.dto';
import { GlobalExceptionFilter } from '../filter-ManejoErrores/http-exception.filter';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@UseFilters(GlobalExceptionFilter) // ⛑️ Aplicar el filtro de excepciones a este controlador para los errores.
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post() //Metodo para crear un nuevo cliente
  @UseGuards(AuthGuard('jwt'), RolesGuard) //  Protegido por JWT y roles
  @Roles('admin')   // Solo admins pueden crear nuevos clientes
  create(@Body() dto: CreateClienteDto) {
    return this.clienteService.create(dto);
  }

  @Get() //Metodo para ver todos los clientes 
  findAll() {
    return this.clienteService.findAll();
  }
}
