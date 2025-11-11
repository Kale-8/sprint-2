import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

//Este middleware registra el tiempo de cada solicitud entrante con su método HTTP y URL.
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) { //Recibe peticion, respuesta y funcion para continuar
    const { method, originalUrl } = req; //Extrae el metodo POST, GET...
    const timestamp = new Date().toISOString();  //Registra el tiempo cuando se realizo la peticion 
    console.log(`[${timestamp}] ${method} ${originalUrl}`);//Imprime el tiempo y la ruta de la peticion hecha
    next(); // ⏭️ Continúa con el siguiente middleware o controlador
  }
}
