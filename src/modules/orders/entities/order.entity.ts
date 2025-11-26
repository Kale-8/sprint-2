import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { OrderItem } from './order-item.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  OTHER = 'OTHER'
}

@Entity({ name: 'orders' })
@Index(['orderDate', 'status']) // Índice compuesto para búsquedas frecuentes
@Index(['client']) // Índice para búsquedas por cliente
export class Order {
  @ApiProperty({
    description: 'ID único del pedido',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Fecha y hora en que se creó el pedido',
    example: '2023-01-01T00:00:00.000Z'
  })
  @CreateDateColumn({ name: 'order_date' })
  orderDate: Date;

  @ApiProperty({
    description: 'Fecha y hora de la última actualización del pedido',
    example: '2023-01-01T00:00:00.000Z'
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Monto total del pedido',
    example: 99.99
  })
  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false
  })
  total: number;

  @ApiProperty({
    description: 'Estado actual del pedido',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    example: OrderStatus.PENDING
  })
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @ApiProperty({
    description: 'Método de pago utilizado',
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
    example: PaymentMethod.CREDIT_CARD
  })
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CASH
  })
  paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'Notas adicionales sobre el pedido',
    example: 'El cliente solicitó factura',
    required: false,
    nullable: true
  })
  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @ApiProperty({
    description: 'Cliente que realizó el pedido',
    type: () => Client
  })
  @ManyToOne(() => Client, (client) => client.orders, {
    onDelete: 'RESTRICT',
    nullable: false
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ApiProperty({
    description: 'Usuario (vendedor) que gestiona el pedido',
    type: () => User,
    required: false
  })
  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'SET NULL',
    nullable: true
  })
  @JoinColumn({ name: 'user_id' })
  user: User | null;

  @ApiProperty({
    description: 'Items que componen el pedido',
    type: () => [OrderItem]
  })
  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
    eager: true
  })
  orderItems: OrderItem[];
}
