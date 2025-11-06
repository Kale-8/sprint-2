import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  categoria: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  stock: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.productos)
  creadoPor: Usuario;

  @ManyToMany(() => Pedido, (pedido) => pedido.productos)
  pedidos: Pedido[];
}
