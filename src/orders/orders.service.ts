import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  findAll() {
    return this.orderRepository.find({
      relations: [
        'cliente',
        'vendedor',
        'pedidoProductos',
        'pedidoProductos.product',
      ],
    });
  }

  findById(id: number) {
    return this.orderRepository.findOne({
      where: { id },
      relations: [
        'cliente',
        'vendedor',
        'pedidoProductos',
        'pedidoProductos.product',
      ],
    });
  }

  async create(payload: Partial<Order>) {
    const entity = this.orderRepository.create(payload);
    return this.orderRepository.save(entity);
  }

  async update(id: number, changes: Partial<Order>) {
    await this.orderRepository.update({ id }, changes);
    return this.findById(id);
  }

  async remove(id: number) {
    await this.orderRepository.delete({ id });
  }
}
