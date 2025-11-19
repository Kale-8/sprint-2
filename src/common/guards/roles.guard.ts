import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as any;
    if (!user) {
      return false;
    }

    const userRoles: string[] = Array.isArray(user.roles)
      ? user.roles.map((r: any) => (typeof r === 'string' ? r : r?.name)).filter(Boolean)
      : [];

    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
