import {Entity, PrimaryGeneratedColumn, Column, ManyToMany,} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, length: 50 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    // Relación inversa ManyToMany con User
    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}