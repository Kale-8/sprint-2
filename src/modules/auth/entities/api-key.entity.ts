import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('api_keys')
export class ApiKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column()
  name: string;

  @Column('simple-array', { default: '' })
  scopes: string[]; 
}
