//Vamos a implementar un guard que valide si la API Key es correcta.
//Osea que con una clave especial se pueda acceder a ciertos endpoints para modificar o crear datos a mi base de datos.

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  //CanActivate decide si la petición puede continuar o no.
  canActivate(context: ExecutionContext): boolean {
    //CanActivate se ejecuta antes del controlador y con el context accede a la peticion.

    // Extrae la API Key desde los headers de la petición HTTP
    const request = context.switchToHttp().getRequest(); //Cambia el contexto HTTP y accede a la peticion.
    const apiKey = request.headers['x-api-key']; //Obtiene la API Key desde el header 'x-api-key'.

    // La clave que aceptamos (puede venir de .env)
    const validApiKey = process.env.API_KEY; //Obtiene la clave valida desde las variables de entorno.

    // Verifica si la API Key es válida

    if (!apiKey || apiKey !== validApiKey) {
      throw new UnauthorizedException('API Key inválida o ausente');
    }

    // Si la clave es válida, permite el acceso
    return true;
  }
}
