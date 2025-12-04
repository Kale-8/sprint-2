import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from '../clients/client.entity';
import { User } from '../users/user.entity';
import { OrderItem } from './order-item.entity';

export type OrderStatus =
  | 'pendiente'
  | 'confirmado'
  | 'enviado'
  | 'entregado'
  | 'cancelado';

@Entity({ name: 'pedidos' })
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  clienteId!: number;

  @Column({ type: 'int' })
  vendedorId!: number;

  @ManyToOne(() => Client, (client) => client.pedidos, { onDelete: 'RESTRICT' })
  cliente!: Client;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'RESTRICT' })
  vendedor!: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total!: string;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente',
  })
  estado!: OrderStatus;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaPedido!: Date;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp with time zone' })
  updatedAt!: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.pedido)
  pedidoProductos!: OrderItem[];
}
