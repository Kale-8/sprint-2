import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';

@Entity({ name: 'pedido_productos' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  pedidoId!: number;

  @Column({ type: 'int' })
  productoId!: number;

  @ManyToOne(() => Order, (order) => order.pedidoProductos, { onDelete: 'CASCADE' })
  pedido!: Order;

  @ManyToOne(() => Product, (product) => product.pedidoProductos, { onDelete: 'RESTRICT' })
  product!: Product;

  @Column({ type: 'int' })
  cantidad!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioUnitario!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal!: string;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp with time zone' })
  updatedAt!: Date;
}


