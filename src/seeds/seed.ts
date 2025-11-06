// src/seeds/seed.ts
import AppDataSource from '../data-source';
import { Usuario } from '../modules/usuarios/entities/usuario.entity';
import { Producto } from '../modules/productos/entities/producto.entity';
import { Cliente } from '../modules/clientes/entities/cliente.entity';
import { Pedido } from '../modules/pedidos/entities/pedido.entity';

async function seed() {
  await AppDataSource.initialize();
  console.log(' Conectado a la base de datos.');

  // Repositorios
  const usuarioRepo = AppDataSource.getRepository(Usuario);
  const productoRepo = AppDataSource.getRepository(Producto);
  const clienteRepo = AppDataSource.getRepository(Cliente);
  const pedidoRepo = AppDataSource.getRepository(Pedido);

  // ======  Crear usuario administrador ======
  const admin = usuarioRepo.create({
    nombre: 'Admin',
    email: 'admin@tienda.com',
    password: '123456',
    rol: 'admin',
  });
  await usuarioRepo.save(admin);

  // ======  Crear cliente ======
  const cliente1 = clienteRepo.create({
    nombre: 'Carlos Pérez',
    email: 'carlos@correo.com',
    telefono: '3001234567',
    direccion: 'Calle 10 #5-20',
  });
  await clienteRepo.save(cliente1);

  // ======  Crear productos (relación con admin) ======
  const producto1 = productoRepo.create({
    nombre: 'Nike Air Max',
    categoria: 'Zapatos deportivos de alta calidad',
    precio: 350000,
    stock: 10,
    creadoPor: admin, // 
  });

  const producto2 = productoRepo.create({
    nombre: 'Camiseta Nike Dri-Fit',
    categoria: 'Camiseta deportiva ligera',
    precio: 120000,
    stock: 25,
    creadoPor: admin,
  });

  await productoRepo.save([producto1, producto2]);

  // ======  Crear pedido (cliente y admin) ======
  const pedido1 = pedidoRepo.create({
    fecha: new Date(),
    total: producto1.precio + producto2.precio,
    cliente: cliente1, // 
    creadoPor: admin,
    productos: [producto1, producto2], 
  });
  await pedidoRepo.save(pedido1);

  console.log(' Datos insertados correctamente.');
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error(' Error ejecutando seed:', error);
  AppDataSource.destroy();
});
