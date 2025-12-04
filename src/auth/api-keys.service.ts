import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from './entities/api-key.entity';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { hashString, compareHash } from '../common/utils/hash.util';
import { randomBytes } from 'crypto';

@Injectable()
export class ApiKeysService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
  ) {}

  async create(dto: CreateApiKeyDto, createdById?: number) {
    // Generar API key aleatoria con prefijo
    const plainKey = 'sk_' + randomBytes(32).toString('hex');
    const keyHash = await hashString(plainKey);

    const apiKey = this.apiKeyRepository.create({
      nombre: dto.nombre,
      keyHash,
      scopes: dto.scopes,
      expiraEn: dto.expiraEn ? new Date(dto.expiraEn) : null,
      createdById,
    });

    const saved = await this.apiKeyRepository.save(apiKey);

    // Retornar la key en texto plano SOLO en la creación
    return {
      ...saved,
      plainKey, // Solo se muestra una vez
    };
  }

  async findAll() {
    const keys = await this.apiKeyRepository.find({
      relations: ['createdBy'],
      select: {
        id: true,
        nombre: true,
        scopes: true,
        activa: true,
        expiraEn: true,
        ultimoUso: true,
        createdAt: true,
        updatedAt: true,
        createdBy: {
          id: true,
          nombre: true,
          email: true,
        },
      },
    });

    // No mostrar el hash completo, solo los primeros caracteres
    return keys.map((key) => ({
      ...key,
      keyPreview: key.keyHash.substring(0, 12) + '...',
    }));
  }

  async findOne(id: string) {
    return this.apiKeyRepository.findOne({
      where: { id },
      relations: ['createdBy'],
      select: {
        id: true,
        nombre: true,
        scopes: true,
        activa: true,
        expiraEn: true,
        ultimoUso: true,
        createdAt: true,
        updatedAt: true,
        createdBy: {
          id: true,
          nombre: true,
          email: true,
        },
      },
    });
  }

  async update(id: string, dto: UpdateApiKeyDto) {
    const updateData: any = {};
    if (dto.nombre) updateData.nombre = dto.nombre;
    if (dto.scopes) updateData.scopes = dto.scopes;
    if (dto.expiraEn !== undefined)
      updateData.expiraEn = dto.expiraEn ? new Date(dto.expiraEn) : null;
    if (dto.activa !== undefined) updateData.activa = dto.activa;

    await this.apiKeyRepository.update(id, updateData);
    return this.findOne(id);
  }

  async revoke(id: string) {
    await this.apiKeyRepository.update(id, { activa: false });
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.apiKeyRepository.delete(id);
  }

  async validateKey(plainKey: string): Promise<ApiKey | null> {
    // Buscar todas las keys activas
    const keys = await this.apiKeyRepository.find({
      where: { activa: true },
    });

    // Comparar el hash
    for (const key of keys) {
      const isValid = await compareHash(plainKey, key.keyHash);
      if (isValid) {
        // Verificar expiración
        if (key.expiraEn && new Date() > key.expiraEn) {
          return null;
        }

        // Actualizar último uso
        await this.apiKeyRepository.update(key.id, { ultimoUso: new Date() });

        return key;
      }
    }

    return null;
  }
}
