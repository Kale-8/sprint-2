import { DataSource } from 'typeorm';
import { Role } from '../auth/entities/role.entity';
import { Permission } from '../auth/entities/permission.entity';
import { User } from '../users/user.entity';
import { hashString } from '../common/utils/hash.util';

export async function seedRolesAndPermissions(dataSource: DataSource) {
  const roleRepository = dataSource.getRepository(Role);
  const permissionRepository = dataSource.getRepository(Permission);
  const userRepository = dataSource.getRepository(User);

  console.log('🌱 Seeding roles and permissions...');

  // Crear permisos
  const permissions = [
    // Permisos de usuarios
    {
      nombre: 'users:read',
      descripcion: 'Ver usuarios',
      recurso: 'users',
      accion: 'read',
    },
    {
      nombre: 'users:create',
      descripcion: 'Crear usuarios',
      recurso: 'users',
      accion: 'create',
    },
    {
      nombre: 'users:update',
      descripcion: 'Actualizar usuarios',
      recurso: 'users',
      accion: 'update',
    },
    {
      nombre: 'users:delete',
      descripcion: 'Eliminar usuarios',
      recurso: 'users',
      accion: 'delete',
    },

    // Permisos de productos
    {
      nombre: 'products:read',
      descripcion: 'Ver productos',
      recurso: 'products',
      accion: 'read',
    },
    {
      nombre: 'products:create',
      descripcion: 'Crear productos',
      recurso: 'products',
      accion: 'create',
    },
    {
      nombre: 'products:update',
      descripcion: 'Actualizar productos',
      recurso: 'products',
      accion: 'update',
    },
    {
      nombre: 'products:delete',
      descripcion: 'Eliminar productos',
      recurso: 'products',
      accion: 'delete',
    },

    // Permisos de clientes
    {
      nombre: 'clients:read',
      descripcion: 'Ver clientes',
      recurso: 'clients',
      accion: 'read',
    },
    {
      nombre: 'clients:create',
      descripcion: 'Crear clientes',
      recurso: 'clients',
      accion: 'create',
    },
    {
      nombre: 'clients:update',
      descripcion: 'Actualizar clientes',
      recurso: 'clients',
      accion: 'update',
    },
    {
      nombre: 'clients:delete',
      descripcion: 'Eliminar clientes',
      recurso: 'clients',
      accion: 'delete',
    },

    // Permisos de órdenes
    {
      nombre: 'orders:read',
      descripcion: 'Ver órdenes',
      recurso: 'orders',
      accion: 'read',
    },
    {
      nombre: 'orders:create',
      descripcion: 'Crear órdenes',
      recurso: 'orders',
      accion: 'create',
    },
    {
      nombre: 'orders:update',
      descripcion: 'Actualizar órdenes',
      recurso: 'orders',
      accion: 'update',
    },
    {
      nombre: 'orders:delete',
      descripcion: 'Eliminar órdenes',
      recurso: 'orders',
      accion: 'delete',
    },
  ];

  const createdPermissions: Permission[] = [];
  for (const permData of permissions) {
    let permission = await permissionRepository.findOne({
      where: { nombre: permData.nombre },
    });
    if (!permission) {
      permission = permissionRepository.create(permData);
      permission = await permissionRepository.save(permission);
      console.log(`  ✓ Created permission: ${permission.nombre}`);
    }
    createdPermissions.push(permission);
  }

  // Crear roles
  let adminRole = await roleRepository.findOne({
    where: { nombre: 'admin' },
    relations: ['permissions'],
  });
  if (!adminRole) {
    adminRole = roleRepository.create({
      nombre: 'admin',
      descripcion: 'Administrador con acceso completo',
    });
    adminRole = await roleRepository.save(adminRole);
    console.log(`  ✓ Created role: ${adminRole.nombre}`);
  }

  let vendedorRole = await roleRepository.findOne({
    where: { nombre: 'vendedor' },
    relations: ['permissions'],
  });
  if (!vendedorRole) {
    vendedorRole = roleRepository.create({
      nombre: 'vendedor',
      descripcion: 'Vendedor con permisos limitados',
    });
    vendedorRole = await roleRepository.save(vendedorRole);
    console.log(`  ✓ Created role: ${vendedorRole.nombre}`);
  }

  // Asignar todos los permisos al admin
  adminRole.permissions = createdPermissions;
  await roleRepository.save(adminRole);
  console.log(`  ✓ Assigned all permissions to admin role`);

  // Asignar permisos limitados al vendedor (solo lectura y crear/actualizar órdenes)
  const vendedorPermissions = createdPermissions.filter(
    (p) =>
      p.nombre.includes(':read') ||
      p.nombre.startsWith('orders:create') ||
      p.nombre.startsWith('orders:update'),
  );
  vendedorRole.permissions = vendedorPermissions;
  await roleRepository.save(vendedorRole);
  console.log(`  ✓ Assigned limited permissions to vendedor role`);

  // Migrar usuarios existentes del campo 'rol' a la relación 'roles'
  const users = await userRepository.find({ relations: ['roles'] });
  for (const user of users) {
    if (user.rol && user.roles.length === 0) {
      const roleName = user.rol;
      const role = await roleRepository.findOne({
        where: { nombre: roleName },
      });
      if (role) {
        user.roles = [role];
        await userRepository.save(user);
        console.log(`  ✓ Migrated user ${user.email} to role: ${roleName}`);
      }
    }
  }

  // Crear usuario admin de prueba si no existe
  const adminEmail = 'admin@sportsline.com';
  let adminUser = await userRepository.findOne({
    where: { email: adminEmail },
    relations: ['roles'],
  });
  if (!adminUser) {
    const passwordHash = await hashString('admin123');
    adminUser = userRepository.create({
      nombre: 'Administrador',
      email: adminEmail,
      passwordHash,
      rol: 'admin',
      roles: [adminRole],
    });
    await userRepository.save(adminUser);
    console.log(`  ✓ Created admin user: ${adminEmail} (password: admin123)`);
  }

  // Crear usuario vendedor de prueba si no existe
  const vendedorEmail = 'vendedor@sportsline.com';
  let vendedorUser = await userRepository.findOne({
    where: { email: vendedorEmail },
    relations: ['roles'],
  });
  if (!vendedorUser) {
    const passwordHash = await hashString('vendedor123');
    vendedorUser = userRepository.create({
      nombre: 'Vendedor',
      email: vendedorEmail,
      passwordHash,
      rol: 'vendedor',
      roles: [vendedorRole],
    });
    await userRepository.save(vendedorUser);
    console.log(
      `  ✓ Created vendedor user: ${vendedorEmail} (password: vendedor123)`,
    );
  }

  console.log('✅ Roles and permissions seeded successfully!');
}
