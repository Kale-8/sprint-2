import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

//CanActivate decide si la petición puede continuar o no.
//ExecutionContext representa HTTP, WebSocket, RPC contextos.
//Injectable marca la clase para inyección de dependencias.
//Reflector permite acceder a los metadatos osea a las notas invisibles.
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}     //Se usa para leer los metadatos guardados por el decorador @Roles() en el controlador.
  canActivate(context: ExecutionContext): boolean {      //CanActivate se ejecuta antes del controlador y con el context accede a la peticion y con el boolean decide si continua o no.

    // Extrae los roles requeridos desde el decorador @Roles()
    //Reflector lee los metadatos, context.getHandler() accede al método del controlador que está siendo ejecutado. Si en ese método escribiste @Roles('admin'), aquí obtienes ['admin'].
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;
    // Extrae el usuario autenticado desde la petición HTTP
    const request = context.switchToHttp().getRequest();    //Cambia el contexto HTTP y accede a la peticion y extrae req.user de la entidad usuario autenticado.

    console.log('RolesGuard -> requiredRoles:', requiredRoles);
    console.log('RolesGuard -> req.user:', request.user);

    const user = request.user;

    // Si no hay usuario niega el acceso.
    if (!user) throw new ForbiddenException('Acceso denegado.');

    const userRole = typeof user.role === 'string' ? user.role.toLowerCase() : user.role?.name.toLowerCase();
    const required = requiredRoles.map(r => r.toLowerCase());

    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException('Acceso denegado.');
    }

    if (!required.includes(userRole)) {
      throw new ForbiddenException('Acceso denegado.');
    }

    return true;
  }
}
