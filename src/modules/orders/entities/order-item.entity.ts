import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Relación ManyToOne con Order
    @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column({ name: 'order_id' })
    orderId: string;

    // Relación ManyToOne con Product
    @ManyToOne(() => Product, (product) => product.orderItems, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ name: 'product_id' })
    productId: string;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number; // Precio al momento de la compra

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;

    // Calcula el subtotal automáticamente antes de insertar o actualizar
    @BeforeInsert()
    @BeforeUpdate()
    calculateSubtotal() {
        this.subtotal = this.quantity * this.price;
    }
}