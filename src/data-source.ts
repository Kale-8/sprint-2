import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Usuario } from './modules/usuarios/entities/usuario.entity';
import { Producto } from './modules/productos/entities/producto.entity';
import { Cliente } from './modules/clientes/entities/cliente.entity';
import { Pedido } from './modules/pedidos/entities/pedido.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  synchronize: false,
  logging: true,
  entities: [Usuario, Producto, Cliente, Pedido],
  migrations: ['src/migrations/*.ts'],
});

export default AppDataSource;
