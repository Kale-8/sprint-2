import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './create-usuario.dto';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>,
    ) {}

    async create(dto: CreateUsuarioDto): Promise<Usuario> {
        const usuario = this.usuarioRepo.create(dto);
        return this.usuarioRepo.save(usuario);
    }

    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepo.find();
    }
}
