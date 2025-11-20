import { DataSource } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity/cliente.entity';
import { Producto } from '../producto/producto.entity/producto.entity';
import { Pedido } from '../pedido/pedido.entity/pedido.entity';
import { Usuario } from '../usuario/usuario.entity';
import { Role } from '../usuario/role/role.entity'
import { seedRoles } from './role.seed';
import bcrypt from 'bcrypt'; //Importamos el metodo bcrypt de su libreria para encriptar contraseñas.

export async function seedTotales(dataSource: DataSource) {

  await seedRoles(dataSource); // ✅ Asegura que los roles existan


  // 🌱 Insertar clientes
  const clienteRepo = dataSource.getRepository(Cliente);
  const clientesExistentes = await clienteRepo.find();//Aca verificamos si ya hay clientes en la base de datos para no duplicar.
  if(clientesExistentes.length === 0){
    const clientes = dataSource.getRepository(Cliente).create([
      { nombre: 'Steven', direccion: 'Medellín' },
      { nombre: 'Laura', direccion: 'Bogotá' },
      { nombre: 'Carlos', direccion: 'Cali' },
      { nombre: 'Ana', direccion: 'Barranquilla' },
    ]);
    await dataSource.getRepository(Cliente).save(clientes);// Guardamos los clientes en la base de datos en la tabla cliente.
    console.log(`✅ Clientes insertados`);
  }else{
    console.log(`ℹ️ Clientes ya existen, no se insertaron`);
  }
  const clientes = await clienteRepo.find(); //Obtenemos los clientes guardados para usarlos en los pedidos.


  // 🛒 Insertar productos
  const productoRepo = dataSource.getRepository(Producto);
  const productosExistentes = await productoRepo.find();//Aca verificamos si ya hay productos en la base de datos para no duplicar.
  if(productosExistentes.length === 0){
    const productos = dataSource.getRepository(Producto).create([ // Creamos varios productos
      { nombre: 'Balón de fútbol', precio: 120000, stock: 10 },
      { nombre: 'Guayos Nike', precio: 250000, stock: 5 },
      { nombre: 'Camiseta oficial', precio: 80000, stock: 20 },
      { nombre: 'Botella deportiva', precio: 30000, stock: 50 },
    ]);
    await dataSource.getRepository(Producto).save(productos);//Guardamos los productos en la base de datos en la tabla producto.
    console.log(`✅ Productos insertados`);
  }else{
    console.log(`ℹ️ Productos ya existen, no se insertaron`);
  }
  const productos = await productoRepo.find(); //Obtenemos los productos guardados para usarlos en los pedidos.

  // 📦 Insertar pedidos

  const pedidoRepo = dataSource.getRepository(Pedido);
  const pedidosExistentes = await pedidoRepo.find();//Aca verificamos si ya hay pedidos en la base de datos para no duplicar.
  if (pedidosExistentes.length === 0) {
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
    console.log(`✅ Pedidos insertados`);
  } else {
    console.log(`ℹ️ Pedidos ya existen, no se insertaron`);
  }

  // 👤 Insertar usuarios
  const usuarioRepo = dataSource.getRepository(Usuario);
  const roleRepo = dataSource.getRepository(Role);  
  const existeUsers = await usuarioRepo.find();//Aca verificamos si ya hay pedidos en la base de datos para no duplicar.

  if (existeUsers.length === 0) {
    const adminRole = await roleRepo.findOne({ where: { name: 'admin' } });
    const userRole = await roleRepo.findOne({ where: { name: 'user' } });

    if (!adminRole || !userRole) throw new Error('Roles no encontrados');

const usuarios = [
  usuarioRepo.create({
    nombre: 'Admin',
    email: 'stiven@gmail.com',
    password: await bcrypt.hash('admin123', 10),
    role: adminRole,
  }),
  usuarioRepo.create({
    nombre: 'User',
    email: 'user1@gmail.com',
    password: await bcrypt.hash('user123', 10),
    role: userRole,
  }),
  usuarioRepo.create({
    nombre: 'User2',
    email: 'user2@gmail.com',
    password: await bcrypt.hash('user234', 10),
    role: userRole,
  }),
];
        await usuarioRepo.save(usuarios);

        console.log(`✅ Usuarios insertados`);
  }else{
        console.log(`ℹ️ Usuarios ya existen, no se insertaron`);
    }

  console.log('✅ Seed completo: clientes, productos, pedidos y usuarios insertados');
}