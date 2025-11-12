import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

//CanActivate decide si la petición puede continuar o no.
//ExecutionContext representa HTTP, WebSocket, RPC contextos.
//Injectable marca la clase para inyección de dependencias.
//Reflector permite acceder a los metadatos osea a las notas invisibles.

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {}//Se usa para leer los metadatos guardados por el decorador @Roles() en el controlador.

    canActivate(context: ExecutionContext): boolean {//CanActivate se ejecuta antes del controlador y con el context accede a la peticion y con el boolean decide si continua o no.
        
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());//Reflector lee los metadatos, context.getHandler() accede al método del controlador que está siendo ejecutado. Si en ese método escribiste @Roles('admin'), aquí obtienes ['admin'].
       
        if (!requiredRoles) return true;

        const { user } = context.switchToHttp().getRequest();//Cambia el contexto HTTP y accede a la peticion y extrae req.user de la entidad usuario autenticado.

        return requiredRoles.includes(user?.role);//Compara el rol de la entidad con el metadato, si coincide devuelve true y la peticion continua.
        
  }
}
