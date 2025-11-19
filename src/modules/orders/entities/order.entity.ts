import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import { Client } from 'src/modules/clients/entities/client.entity';
import { OrderItem } from './order-item.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  orderDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING',
  })
  status: string;

  @Column({
    type: 'enum',
    enum: ['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'OTHER'],
    default: 'CASH'
  })
  paymentMethod: string;

  // Cliente que realiza el pedido
  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  // Usuario (vendedor) que gestiona el pedido
  @ManyToOne(() => User, (user) => user.orders, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Detalles del pedido
  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  orderItems: OrderItem[];
}
