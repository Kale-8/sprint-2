//Este archvivo es necesario para las migraciones y los seeders de TypeORM
//Este archivo es para tiempo de desarrollo, no para produccion
//Y hay que agregar esta linea   "migration:run": "ts-node --transpile-only ./node_modules/typeorm/cli.js migration:run -d ./data-source.ts"
//para poder ejecutar las migraciones con el comando: npm run migration:run
import { DataSource } from 'typeorm';
import { Usuario } from './src/usuario/usuario.entity';
import { Producto } from './src/producto/producto.entity/producto.entity';
import { Cliente } from './src/cliente/cliente.entity/cliente.entity';
import { Pedido } from './src/pedido/pedido.entity/pedido.entity';
import { Role } from './src/usuario/role/role.entity';
import * as dotenv from 'dotenv';

dotenv.config(); //Cargamos las variables de entorno desde el archivo .env

//Aca configuramos la conexion a la base de datos usando las variables de entorno
export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Usuario, Role, Producto, Cliente, Pedido], // Agregamos las entidades aqui, osea las tablas de la base de datos
  migrations: ['src/database/migrations/*.ts'], //Ruta de las migraciones
});