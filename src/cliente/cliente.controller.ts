import { Controller, Post, Body, Get, NotFoundException, UseFilters, UseGuards } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './create-cliente.dto';
import { GlobalExceptionFilter } from '../filter-ManejoErrores/http-exception.filter';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyAuth } from '../auth/api-key.decorator';
import { ApiKeyScopesGuard } from '../auth/api-key-scopes.guard';
import { Scopes } from '../auth/scopes.decorator';

@ApiTags('Clientes') // Agrupa los endpoints en Swagger
@UseFilters(GlobalExceptionFilter)

@UseFilters(GlobalExceptionFilter) //  Aplicar el filtro de excepciones a este controlador para los errores.
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post() //Metodo para crear un nuevo cliente
  @ApiKeyAuth() // protege con x-api-key
  create(@Body() dto: CreateClienteDto) {
    return this.clienteService.create(dto);
  }

  @Get() //Metodo para ver todos los clientes 
  @ApiKeyAuth() // protege con x-api-key
  @UseGuards(ApiKeyScopesGuard)
  @Scopes('read:clientes') // 🔒 este endpoint requiere permiso de lectura
  findAll() {
    return this.clienteService.findAll();
  }
}
