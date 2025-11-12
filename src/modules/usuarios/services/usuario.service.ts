import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { CreateUsuarioDto } from '../dto/create.usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const user = await this.usuarioRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create(dto);
    return this.usuarioRepository.save(nuevoUsuario);
  }

  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    Object.assign(usuario, dto);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }
}

