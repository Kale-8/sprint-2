import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'empleado' })
  rol: string; // admin | empleado

  @OneToMany(() => Producto, (producto) => producto.creadoPor)
  productos: Producto[];

  @OneToMany(() => Pedido, (pedido) => pedido.creadoPor)
  pedidos: Pedido[];
}
