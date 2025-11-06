import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  cliente: Cliente;

  @ManyToOne(() => Usuario, (usuario) => usuario.pedidos)
  creadoPor: Usuario;

  @ManyToMany(() => Producto, (producto) => producto.pedidos)
  @JoinTable({
    name: 'pedido_productos', // tabla intermedia
    joinColumn: { name: 'pedido_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'producto_id', referencedColumnName: 'id' },
  })
  productos: Producto[];
}
