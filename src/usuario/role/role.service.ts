import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

//Esto permitira crear roles desde el frontend o seedearlos
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async create(name: string): Promise<Role> {  //Crear el role y lo guarda en la base de datos.
    const role = this.roleRepo.create({ name });
    return this.roleRepo.save(role);
  }

  async findAll(): Promise<Role[]> {  //Muestra el listado de los roles.
    return this.roleRepo.find();
  }
}
