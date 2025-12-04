import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { Permission } from './permission.entity';

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    nombre!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    descripcion!: string | null;

    @ManyToMany(() => User, (user) => user.roles)
    users!: User[];

    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable({
        name: 'role_permissions',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    })
    permissions!: Permission[];

    @CreateDateColumn({ name: 'createdAt', type: 'timestamp with time zone' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp with time zone' })
    updatedAt!: Date;
}
