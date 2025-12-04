import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { API_KEY_SCOPES_KEY } from 'src/modules/auth/dto/api-key-scopes.decorator';

@Injectable()
export class ApiKeyScopesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.reflector.getAllAndOverride<string[]>(API_KEY_SCOPES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredScopes || requiredScopes.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const apiKey = request.apiKey;
    if (!apiKey || !apiKey.scopes) {
      throw new ForbiddenException('No se encontraron scopes asociados a la API key');
    }

    const hasScope = requiredScopes.every(scope => apiKey.scopes.includes(scope));
    if (!hasScope) {
      throw new ForbiddenException(`Se requiere uno de los scopes: ${requiredScopes.join(', ')}`);
    }

    return true;
  }
}
