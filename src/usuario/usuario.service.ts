import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './create-usuario.dto';
import * as bcrypt from 'bcrypt';


@Injectable()   //Decorador para CRUD de crear y listar usuarios.
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>,
    ) {}

    async create(dto: CreateUsuarioDto): Promise<Usuario> {    //Metodo POST para crear un nuevo usuario
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const usuario = this.usuarioRepo.create({
            ...dto, // Usamos el operador spread para copiar las propiedades del DTO
            password: hashedPassword, // Guardamos la contraseña hasheada en lugar de la original
        });

        return this.usuarioRepo.save(usuario);
    }

    async findAll(): Promise<Usuario[]> {     //Metodo GET para listar usuarios.
        return this.usuarioRepo.find();
    }
}
