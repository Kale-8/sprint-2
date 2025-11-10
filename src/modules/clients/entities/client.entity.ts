import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 20, nullable: true })
    phone: string;

    @Column({ unique: true, length: 50 })
    document: string; // Cédula, NIT, etc.

    // Relación OneToMany con Order
    @OneToMany(() => Order, (order) => order.client)
    orders: Order[];
}