import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import { ApiKeysService } from '../api-keys.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly apiKeysService: ApiKeysService) {
    super();
  }

  async validate(req: Request): Promise<any> {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new UnauthorizedException('API key not provided');
    }

    const validKey = await this.apiKeysService.validateKey(apiKey);

    if (!validKey) {
      throw new UnauthorizedException('Invalid or expired API key');
    }

    // Retornar información de la API key para usar en guards
    return {
      apiKeyId: validKey.id,
      apiKeyName: validKey.nombre,
      scopes: validKey.scopes,
      type: 'api-key',
    };
  }
}
