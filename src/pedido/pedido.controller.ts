import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './create-pedido.dto';
import { Roles } from '../guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('pedidos')
export class PedidoController {

    //Inyectamos el servicio de Pedido para usar sus metodos en el controlador
    constructor(private readonly pedidoService: PedidoService) {}

    @Get() //Ruta GET /pedidos para listar todos los pedidos
    getAll() {
      return this.pedidoService.listarPedidos();
    }

    @Get('cliente/:id') //Ruta GET /pedidos/cliente/:id para obtener pedidos por cliente
    @UseGuards(AuthGuard('jwt'), RolesGuard) //  Protegido por JWT y roles
    @Roles('admin')   // Solo admins pueden ver los pedidos de un solo cliente
    getByCliente(@Param('id') id: number) {
      return this.pedidoService.pedidosPorCliente(id);
    }

    @Get(':id')//Ruta GET /pedidos/:id para obtener un pedido por su ID
    @UseGuards(AuthGuard('jwt'), RolesGuard) //  Protegido por JWT y roles
    @Roles('admin')   // Solo admins pueden buscar un pedido por id 
    getOne(@Param('id') id: number) {
      return this.pedidoService.obtenerPedido(id);
    }

    @Post()//Ruta POST /pedidos para crear un nuevo pedido
    @UseGuards(AuthGuard('jwt'), RolesGuard) //  Protegido por JWT y roles
    @Roles('admin')   // Solo admins pueden crear pedidos
    create(@Body() body: any) {
      return this.pedidoService.crearPedido(body);
    }

    @Post()
    createDto(@Body() dto: CreatePedidoDto) {
      return this.pedidoService.create(dto);
    }
    
    @Get()
    findAll() {
      return this.pedidoService.findAll();
    }
}