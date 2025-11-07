import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('pedidos')
export class PedidoController {

    //Inyectamos el servicio de Pedido para usar sus metodos en el controlador
    constructor(private readonly pedidoService: PedidoService) {}

    @Get() //Ruta GET /pedidos para listar todos los pedidos
    getAll() {
        return this.pedidoService.listarPedidos();
    }

    @Get('cliente/:id') //Ruta GET /pedidos/cliente/:id para obtener pedidos por cliente
    getByCliente(@Param('id') id: number) {
        return this.pedidoService.pedidosPorCliente(id);
    }

    @Get(':id')//Ruta GET /pedidos/:id para obtener un pedido por su ID
    getOne(@Param('id') id: number) {
        return this.pedidoService.obtenerPedido(id);
    }

    @Post()//Ruta POST /pedidos para crear un nuevo pedido
    create(@Body() body: any) {
        return this.pedidoService.crearPedido(body);
    }
}