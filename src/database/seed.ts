import dataSource from '../../data-source';
import { Cliente } from '../cliente/cliente.entity/cliente.entity';
import { Producto } from '../producto/producto.entity/producto.entity';
import { Pedido } from '../pedido/pedido.entity/pedido.entity';

async function seed() {
  await dataSource.initialize();

  // 🌱 Insertar clientes
  const clientes = dataSource.getRepository(Cliente).create([
    { nombre: 'Steven', direccion: 'Medellín' },
    { nombre: 'Laura', direccion: 'Bogotá' },
    { nombre: 'Carlos', direccion: 'Cali' },
    { nombre: 'Ana', direccion: 'Barranquilla' },
  ]);
  await dataSource.getRepository(Cliente).save(clientes);

  // 🛒 Insertar productos
  const productos = dataSource.getRepository(Producto).create([
    { nombre: 'Balón de fútbol', precio: 120000, stock: 10 },
    { nombre: 'Guayos Nike', precio: 250000, stock: 5 },
    { nombre: 'Camiseta oficial', precio: 80000, stock: 20 },
    { nombre: 'Botella deportiva', precio: 30000, stock: 50 },
  ]);
  await dataSource.getRepository(Producto).save(productos);

  // 📦 Insertar pedidos
  const pedidos = dataSource.getRepository(Pedido).create([
    {
      cliente: clientes[0],
      producto: productos[0],
      cantidad: 2,
      fecha: new Date('2025-11-01'),
    },
    {
      cliente: clientes[1],
      producto: productos[1],
      cantidad: 1,
      fecha: new Date('2025-11-02'),
    },
    {
      cliente: clientes[2],
      producto: productos[2],
      cantidad: 3,
      fecha: new Date('2025-11-03'),
    },
    {
      cliente: clientes[0],
      producto: productos[2],
      cantidad: 1,
      fecha: new Date('2025-11-04'),
    },
    {
      cliente: clientes[3],
      producto: productos[3],
      cantidad: 4,
      fecha: new Date('2025-11-05'),
    },
  ]);
  await dataSource.getRepository(Pedido).save(pedidos);

  console.log('✅ Seed completo: clientes, productos y pedidos insertados');
  process.exit();
}

seed();