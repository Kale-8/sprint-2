import {  Controller,Get,Post,Put,Delete,Param,  Body, } from '@nestjs/common';
  import { UsuarioService } from '../services/usuario.service';
  import { Usuario } from '../entities/usuario.entity';
  
  @Controller('users')
  export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}
  
    // 📋 GET /users → lista todos los usuarios
    @Get()
    async getAll(): Promise<Usuario[]> {
      return await this.usuarioService.findAll();
    }
  
    // 🔍 GET /users/:id → obtiene un usuario específico
    @Get(':id')
    async getOne(@Param('id') id: number): Promise<Usuario> {
      return await this.usuarioService.findOne(id);
    }
  
    // ➕ POST /users → crea un nuevo usuario
    @Post()
    async create(@Body() data: Partial<Usuario>): Promise<Usuario> {
      return await this.usuarioService.create(data);
    }
  
    // ✏️ PUT /users/:id → actualiza un usuario
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() data: Partial<Usuario>,
    ): Promise<Usuario> {
      return await this.usuarioService.update(id, data);
    }
  
    // 🗑️ DELETE /users/:id → elimina un usuario
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{ message: string }> {
      await this.usuarioService.delete(id);
      return { message: `Usuario con ID ${id} eliminado correctamente` };
    }
  }
  