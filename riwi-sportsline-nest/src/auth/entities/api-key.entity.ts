import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity({ name: 'api_keys' })
export class ApiKey {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    nombre!: string;

    @Column({ name: 'key_hash', type: 'varchar', length: 255, unique: true })
    keyHash!: string;

    @Column({ type: 'text', array: true, default: '{}' })
    scopes!: string[];

    @Column({ type: 'boolean', default: true })
    activa!: boolean;

    @Column({ name: 'expira_en', type: 'timestamp with time zone', nullable: true })
    expiraEn!: Date | null;

    @Column({ name: 'ultimo_uso', type: 'timestamp with time zone', nullable: true })
    ultimoUso!: Date | null;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'created_by_id' })
    createdBy!: User | null;

    @Column({ name: 'created_by_id', type: 'integer', nullable: true })
    createdById!: number | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
    updatedAt!: Date;
}
