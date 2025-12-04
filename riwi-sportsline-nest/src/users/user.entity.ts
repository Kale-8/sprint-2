import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../auth/entities/role.entity';

export type UserRole = 'admin' | 'vendedor';
export type AuthProvider = 'local' | 'google';

@Entity({ name: 'usuarios' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 150 })
  email!: string;

  @Column({
    name: 'passwordHash',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  passwordHash!: string | null;

  // Mantener campo rol para compatibilidad durante migración
  @Column({ type: 'enum', enum: ['admin', 'vendedor'], nullable: true })
  rol!: UserRole | null;

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles!: Role[];

  // OAuth fields
  @Column({
    name: 'google_id',
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: true,
  })
  googleId!: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar!: string | null;

  @Column({ type: 'enum', enum: ['local', 'google'], default: 'local' })
  provider!: AuthProvider;

  @Column({
    name: 'refreshTokenHash',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  refreshTokenHash!: string | null;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp with time zone' })
  updatedAt!: Date;
}
