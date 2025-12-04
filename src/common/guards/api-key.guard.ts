import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from 'src/modules/auth/entities/api-key.entity';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepo: Repository<ApiKey>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKeyHeader = request.headers['x-api-key'];

    if (!apiKeyHeader) {
      throw new UnauthorizedException('x-api-key no proporcionada');
    }

    const apiKey = await this.apiKeyRepo.findOne({ where: { key: apiKeyHeader } });
    if (!apiKey) {
      throw new ForbiddenException('API key inválida');
    }

    // Agregar los scopes al request para validación posterior
    request.apiKey = apiKey;
    return true;
  }
}
