import { DataSource } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { Role } from '../../modules/roles/entities/role.entity';

export const userSeed = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);
  const roleRepository = dataSource.getRepository(Role);

  // Crear rol de administrador si no existe
  let adminRole = await roleRepository.findOne({ where: { name: 'admin' } });
  
  if (!adminRole) {
    adminRole = roleRepository.create({
      name: 'admin',
      description: 'Administrator role',
    });
    await roleRepository.save(adminRole);
  }

  // Crear usuario administrador si no existe
  const existingAdmin = await userRepository.findOne({ 
    where: { email: 'admin@admin.com' },
    relations: ['roles']
  });

  if (!existingAdmin) {
    // Primero guardamos el usuario sin roles
    const admin = userRepository.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@admin.com',
      password: '123456', // En producción, asegúrate de hashear la contraseña
      isActive: true
    });

    const savedAdmin = await userRepository.save(admin);
    
    // Luego asignamos el rol usando una consulta directa
    await dataSource.createQueryBuilder()
      .insert()
      .into('users_roles')
      .values({
        userId: savedAdmin.id,
        roleId: adminRole.id
      })
      .execute();

    console.log('Admin user created successfully');
  } else {
    console.log('Admin user already exists');
  }
};
