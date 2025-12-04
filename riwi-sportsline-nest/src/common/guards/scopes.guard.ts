import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SCOPES_KEY } from '../decorators/scopes.decorator';

@Injectable()
export class ScopesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredScopes = this.reflector.getAllAndOverride<string[]>(SCOPES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredScopes || requiredScopes.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // Si es autenticación por API key, validar scopes
        if (user && user.type === 'api-key') {
            const hasAllScopes = requiredScopes.every((scope) => user.scopes.includes(scope));

            if (!hasAllScopes) {
                throw new ForbiddenException(`Missing required scopes: ${requiredScopes.join(', ')}`);
            }

            return true;
        }

        // Si es autenticación JWT, permitir acceso (los permisos se validan con PermissionsGuard)
        return true;
    }
}
