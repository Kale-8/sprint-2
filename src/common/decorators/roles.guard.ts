// src/common/guards/roles.guard.ts
import { Injectable,CanActivate,ExecutionContext, ForbiddenException,} from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from '../decorators/roles.decorator';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      // Lee roles requeridos del handler o del controlador
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      // Si no se definieron roles, permitir acceso
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      // Si no hay user, denegar (debería venir del auth guard/JWT)
      if (!user) {
        throw new ForbiddenException('No autenticado');
      }
  
      // Usamos `rol` porque tu entidad usuario lo define así.
      const userRol = user.rol ?? user.role; // intenta soportar ambos nombres
  
      if (!userRol) {
        throw new ForbiddenException('Usuario sin rol definido');
      }
  
      const allowed = requiredRoles.includes(userRol);
  
      if (!allowed) {
        throw new ForbiddenException(
          `No tienes permisos. Se requiere uno de: ${requiredRoles.join(', ')}`
        );
      }
  
      return true;
    }
  }
  