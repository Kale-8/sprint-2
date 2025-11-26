import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus, PaymentMethod } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Client } from '../clients/entities/client.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // Verificar que el cliente existe
    const client = await this.clientRepository.findOne({ 
      where: { id: createOrderDto.clientId } 
    });
    
    if (!client) {
      throw new NotFoundException(`Cliente con ID ${createOrderDto.clientId} no encontrado`);
    }

    // Verificar que el usuario (vendedor) existe si se proporciona
    let user: User | null = null;
    if (createOrderDto.userId) {
      user = await this.userRepository.findOne({ 
        where: { id: createOrderDto.userId } 
      });
      
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${createOrderDto.userId} no encontrado`);
      }
    }

    // Verificar que los productos existen y tienen suficiente stock
    const orderItems = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const product = await this.productRepository.findOne({ 
          where: { id: item.productId } 
        });
        
        if (!product) {
          throw new NotFoundException(`Producto con ID ${item.productId} no encontrado`);
        }
        
        if (product.stock < item.quantity) {
          throw new Error(`Stock insuficiente para el producto ${product.name}`);
        }
        
        // Actualizar el stock del producto
        product.stock -= item.quantity;
        await this.productRepository.save(product);
        
        // Crear el item del pedido
        const orderItem = new OrderItem();
        orderItem.product = product;
        orderItem.quantity = item.quantity;
        orderItem.price = item.price;
        
        return orderItem;
      })
    );

    // Calcular el total del pedido
    const total = orderItems.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    );

    // Crear el pedido
    const order = new Order();
    order.client = client;
    order.user = user;
    order.paymentMethod = createOrderDto.paymentMethod as PaymentMethod;
    order.status = OrderStatus.PENDING;
    order.total = total;
    order.orderItems = orderItems;
    order.notes = createOrderDto.notes || null;

    return this.orderRepository.save(order);
  }

  async findAll() {
    return this.orderRepository.find({
      relations: ['client', 'user', 'orderItems', 'orderItems.product'],
      order: { orderDate: 'DESC' }
    });
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: [
        'client', 
        'user', 
        'orderItems', 
        'orderItems.product'
      ]
    });
    
    if (!order) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    
    // Actualizar solo los campos proporcionados
    if (updateOrderDto.status) {
      order.status = updateOrderDto.status as OrderStatus;
    }
    
    if (updateOrderDto.paymentMethod) {
      order.paymentMethod = updateOrderDto.paymentMethod as PaymentMethod;
    }
    
    if (updateOrderDto.notes !== undefined) {
      order.notes = updateOrderDto.notes || null;
    }
    
    return this.orderRepository.save(order);
  }

  async remove(id: string) {
    const result = await this.orderRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    
    return { 
      message: 'Pedido eliminado exitosamente', 
      orderId: id 
    };
  }
}
