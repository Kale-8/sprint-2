import { DataSource } from 'typeorm';                //Conexion a base de datos.
import { Role } from '../usuario/role/role.entity';  //Entidad que representa los roles.
import { SetMetadata } from '@nestjs/common';   


export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);


export const seedRoles = async (dataSource: DataSource) => {   //Funcion exportada que recibe la conexion a la base de datos.
  const roleRepo = dataSource.getRepository(Role);         //Obtenemos el repositorio de la entidad Role, que nos permite hacer operaciones como findOne, create, save, etc
  const rolesToSeed = ['admin', 'user'];            //Creamos una lista con los nombres de los roles que queremos asegurar en la base de datos.


  for (const name of rolesToSeed) {                     //Hacemos un ciclo Para(for) para recorrer los roles existentes 

    const exists = await roleRepo.findOne({ where: { name } });  //Buscamos si ya existe un rol con ese nombre en la base de datos. Si sí lo guardamos.


    if (!exists) {                      //Si no existe...
      const role = roleRepo.create({ name });    //Creamos un nuevo rol almacenado en la variable role
      await roleRepo.save(role);                 //Guardamos el nuevo rol en la base de datos.
      console.log(`Rol '${name}' creado`);
    } else {
      console.log(`Rol '${name}' ya existe, se omite`);
    }
  }
};




