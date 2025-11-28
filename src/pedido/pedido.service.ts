import { Injectable, NotFoundException } from '@nestjs/common';
import { PedidoRepository } from './pedido.crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity/pedido.entity';
import { Repository } from 'typeorm';
import { CreatePedidoDto } from './create-pedido.dto';

@Injectable()
export class PedidoService {
  //Inyectamos el repositorio personalizado de Pedido para usar save, find, etc.
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: PedidoRepository,
  ) {}

  //Metodo que devuelve todos los pedidos con sus relaciones
  async listarPedidos(): Promise<Pedido[]> {
    return this.pedidoRepo.find({ relations: ['cliente', 'producto'] });
  }

  //Método que usa el repositorio personalizado para buscar todos los pedidos de un cliente específico
  async pedidosPorCliente(clienteId: number): Promise<Pedido[]> {
    return this.pedidoRepo.findByCliente(clienteId);
  }

  //Método que usa el repositorio personalizado para crear un nuevo pedido
  async crearPedido(data: Partial<Pedido>): Promise<Pedido> {
    return this.pedidoRepo.createPedido(data);
  }

  //Método para obtener un pedido por su ID con sus relaciones
  async obtenerPedido(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({
      where: { id },
      relations: ['cliente', 'producto'],
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido coin ID ${id} no encontrado`);
    }
    return pedido;
  }

  //Metodo para crear un nuevo pedido usando DTO
  async create(dto: CreatePedidoDto): Promise<Pedido> {
    const pedido = this.pedidoRepo.create(dto);
    return this.pedidoRepo.save(pedido);
  }

  //Metodo para obtener todos los pedidos
  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepo.find();
  }
}
