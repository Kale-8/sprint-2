import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from '../../pedido/pedido.entity/pedido.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
  
  @Column('decimal')
  precio: number;

  @Column()
  stock: number;

  @OneToMany(() => Pedido, pedido => pedido.producto)
  pedidos: Pedido[];
}

