import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './create-usuario.dto';
import {Role } from './role/role.entity'
import * as bcrypt from 'bcrypt';


@Injectable()   //Decorador para CRUD de crear y listar usuarios.
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>,
        @InjectRepository(Role)
        private readonly roleRepo: Repository<Role>,
    ) {}

    async create(dto: CreateUsuarioDto): Promise<Usuario> {    //Metodo POST para crear un nuevo usuario
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const role = await this.roleRepo.findOne({ where: { name: dto.role } });
        if (!role) throw new Error(`Rol '${dto.role}' no existe`);

        const usuario = this.usuarioRepo.create({
            email: dto.email,
            nombre: dto.nombre,
            password: hashedPassword,
            role, 
        });

        return this.usuarioRepo.save(usuario);
    }

    async findAll(): Promise<Usuario[]> {     //Metodo GET para listar usuarios.
        return this.usuarioRepo.find();
    }
}
