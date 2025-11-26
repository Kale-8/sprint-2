import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { ApiKey } from './entities/api-key.entity';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly repo: Repository<ApiKey>,
  ) {}

  async create(dto: CreateApiKeyDto) {
    const plain = randomBytes(32).toString('hex');
    const keyHash = await bcrypt.hash(plain, 10);
    const entity = this.repo.create({ owner: dto.owner, scopes: dto.scopes ?? [], keyHash, active: true });
    const saved = await this.repo.save(entity);
    return { id: saved.id, apiKey: plain };
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, updateApiKeyDto: UpdateApiKeyDto) {
    await this.repo.update(id, updateApiKeyDto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }

  async deactivate(id: string) {
    await this.repo.update(id, { active: false });
  }

  async validate(plainKey: string) {
    const actives = await this.repo.find({ where: { active: true } });
    for (const e of actives) {
      const match = await bcrypt.compare(plainKey, e.keyHash);
      if (match) return e;
    }
    return null;
  }
}
