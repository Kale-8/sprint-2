import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    SHIPPED = 'SHIPPED',
    CANCELLED = 'CANCELLED',
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ name: 'order_date' })
    orderDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    // Relación ManyToOne con Client
    @ManyToOne(() => Client, (client) => client.orders, { eager: true })
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column({ name: 'client_id' })
    clientId: string;

    // Relación ManyToOne con User (vendedor)
    @ManyToOne(() => User, (user) => user.orders, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'user_id' })
    userId: string;

    // Relación OneToMany con OrderItem
    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
        cascade: true,
        eager: true,
    })
    orderItems: OrderItem[];
}