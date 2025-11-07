import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from '../../cliente/cliente.entity/cliente.entity';
import { Producto } from '../../producto/producto.entity/producto.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, cliente => cliente.pedidos)
  cliente: Cliente;

  @ManyToOne(() => Producto, producto => producto.pedidos)
  producto: Producto;

  @Column('int')
  cantidad: number;

  @Column('timestamp')
  fecha: Date;
}