import { Injectable,  //Inyecta la dependencia.
     CanActivate,             // interfaz que todo guard debe implementar; obliga a tener el método
      ExecutionContext,             // te da acceso al contexto de la petición (request, handler, etc.).
       UnauthorizedException,      // error 401 → cuando la API Key no existe o es inválida. 
        ForbiddenException              //error 403 → cuando la API Key es válida pero no tiene permisos suficientes.
    } from '@nestjs/common';
import { Reflector } from '@nestjs/core';   //sirve para leer la metadata que pusiste con el decorador @Scopes(...).


@Injectable()
export class ApiKeyScopesGuard implements CanActivate {   
  constructor(private reflector: Reflector) {}     //inyecta el Reflector para poder leer los scopes que el endpoint requiere.

  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.reflector.get<string[]>(    //lee los scopes que el endpoint pidió
      'scopes',
      context.getHandler(), // el método del controlador que está siendo ejecutado que hace la petición
    );

    const request = context.switchToHttp().getRequest();    //Cambia el contexto HTTP y accede a la peticion.
    const apiKey = request.headers['x-api-key'];     //lee la API Key enviada en el header.

    // Aquí deberías buscar la key en BD de la tabla de API Keys y obtener sus scopes asociados.
    const keys = {
      'readKey123': ['read:clientes'],
      'writeKey123': ['write:clientes'],
      'adminKey123': ['read:clientes', 'write:clientes'],
    };

    if (!apiKey || !keys[apiKey]) { //Si no se envio la clave o no existe en la BD, lanza error 401.
      throw new UnauthorizedException('API Key inválida');
    }

    if (requiredScopes) {  //Verifica si la API Key tiene los scopes necesarios.
      const hasScopes = requiredScopes.every(scope => //verifica que todos los scopes requeridos estén en los scopes de la API Key
        keys[apiKey].includes(scope),  //keys[apiKey] son los scopes asociados a la API Key proporcionada.
      );
      if (!hasScopes) {
        throw new ForbiddenException('Permisos insuficientes');
      }
    }

    return true;   //Si todo es correcto, permite el acceso al endpoint.
  }
}

//FLUJO DE UN SCOOPE
//1. El cliente hace la petición
//Acción: Alguien (tu frontend, Postman, otro servicio) llama al endpoint, por ejemplo GET /cliente en este caso.
//En los headers incluye x-api-key que en este caso es read:clientes 

//2. El guard intercepta la petición
//Antes de el conotrolador, tu guard de api key y scoopes interceptan la peticion.
//Revisa si el header x-api-key exxiste y es valido.
//Si no hay key corta el flujo con 401 No autorizado.
//El guard compara la key recibida contra tu lista de llaves permitidas (las “llaves quemadas” que tienes definidas).
//Si la key comparada no coincide devuelve error.
//El guard mira qué permisos exige ese endpoint. Los que se marcaron con el decorador @Scopes(...).
//El guard revisa y verifica si incluye todos los scopes necesarios.
//Si no tiene los necesarios, corta el flujo.
//Si todo esta bien, deja pasar la peticion del controlador de cada recurso.(POST /cliente, GET /cliente, etc)