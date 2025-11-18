import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Order } from 'src/modules/orders/entities/order.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Identificador único

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  // Relación N:M con Role
  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable({
    name: 'users_roles', // nombre de tabla intermedia
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[];

  // Relación 1:N con Order
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
