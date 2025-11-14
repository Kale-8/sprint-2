import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

//CanActivate decide si la petición puede continuar o no.
//ExecutionContext representa HTTP, WebSocket, RPC contextos.
//Injectable marca la clase para inyección de dependencias.
//Reflector permite acceder a los metadatos osea a las notas invisibles.


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}     //Se usa para leer los metadatos guardados por el decorador @Roles() en el controlador.

  canActivate(context: ExecutionContext): boolean {      //CanActivate se ejecuta antes del controlador y con el context accede a la peticion y con el boolean decide si continua o no.

    // Extrae los roles requeridos desde el decorador @Roles()
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());    //Reflector lee los metadatos, context.getHandler() accede al método del controlador que está siendo ejecutado. Si en ese método escribiste @Roles('admin'), aquí obtienes ['admin'].

    if (!requiredRoles || requiredRoles.length === 0) return true;

    // Extrae el usuario autenticado desde la petición HTTP
    const request = context.switchToHttp().getRequest();    //Cambia el contexto HTTP y accede a la peticion y extrae req.user de la entidad usuario autenticado.

    const user = request.user;

    // Si no hay usuario o su rol no está permitido, lanza excepción y niega el acceso.
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Acceso denegado: rol insuficiente');
    }

    return true;
  }
}

