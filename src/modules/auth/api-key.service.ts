import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { ApiKey } from './entities/api-key.entity';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly repo: Repository<ApiKey>,
  ) {}

  async create(owner: string, scopes?: string[]) {
    const plain = randomBytes(32).toString('hex');
    const keyHash = await bcrypt.hash(plain, 10);
    const entity = this.repo.create({ owner, scopes, keyHash, active: true });
    const saved = await this.repo.save(entity);
    return { id: saved.id, apiKey: plain };
  }

  async deactivate(id: string) {
    await this.repo.update(id, { active: false });
  }

  async validate(plainKey: string, requiredScopes?: string[]) {
    const actives = await this.repo.find({ where: { active: true } });
    for (const e of actives) {
      const match = await bcrypt.compare(plainKey, e.keyHash);
      if (match) {
        if (requiredScopes && requiredScopes.length) {
          const scopes = Array.isArray(e.scopes) ? e.scopes : [];
          const ok = requiredScopes.every((s) => scopes.includes(s));
          if (!ok) return { ok: false };
        }
        return { ok: true, apiKey: e };
      }
    }
    return { ok: false };
  }
}
