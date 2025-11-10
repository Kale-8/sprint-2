import { Controller, Post, Body, Get  } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './create-cliente.dto';

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
