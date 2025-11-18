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
    const admin = userRepository.create({
      name: 'Admin',
      email: 'admin@admin.com',
      password: '123456', // En producción, asegúrate de hashear la contraseña
      isActive: true,
      roles: [adminRole]
    });

    await userRepository.save(admin);
    console.log('Admin user created successfully');
  } else {
    console.log('Admin user already exists');
  }
};
