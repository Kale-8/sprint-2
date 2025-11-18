import { Entity,  PrimaryGeneratedColumn,  Column,  OneToMany,  CreateDateColumn,} from 'typeorm';
import { Order } from 'src/modules/orders/entities/order.entity';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  document: string; // Ej: cédula o NIT

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  //1:N
  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;
}
