import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiKeyService } from 'src/modules/api-key/api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const key = request.headers['x-api-key'] as string | undefined;
    if (!key) throw new UnauthorizedException('x-api-key header required');

    const valid = await this.apiKeyService.validate(key);
    if (!valid) throw new UnauthorizedException('Invalid API key');

    request.apiKey = valid;
    return true;
  }
}
