import { Controller, Post, Body, Get, NotFoundException, UseFilters } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './create-cliente.dto';
import { GlobalExceptionFilter } from '../filter-ManejoErrores/http-exception.filter';

@UseFilters(GlobalExceptionFilter) // ⛑️ Aplicar el filtro de excepciones a este controlador para los errores.
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() dto: CreateClienteDto) {
    return this.clienteService.create(dto);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }
}
