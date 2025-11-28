import {
  Injectable, //decorador que permite que NestJS inyecte esta clase como dependencia.
  NestInterceptor, //interfaz que obliga a implementar el metodo intercept().
  ExecutionContext, //representa el HTTP, WebSocket, RPC contextos.
  CallHandler, //permite continuar la solicitud o modificar la respuesta.
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //context da acceso a la peticion, next permite continuar la solicitud y observable devuelve la respuesta.
    const now = Date.now(); //Marca el tiempo inicial.
    const req = context.switchToHttp().getRequest(); //Cambia el contexto a la ruta HTTP y obtiene la petición.
    const method = req.method; //Obtiene el método HTTP (GET, POST, etc.).
    const url = req.url; //Obtiene la URL de la petición.

    return next.handle().pipe(
      //Ejecuta el controlador y obtiene la respuesta como un observable.
      tap(() => {
        //Ejecuta una acción secundaria cuando la respuesta está lista.
        const duration = Date.now() - now; //Calcula la duración restando el tiempo inicial al tiempo actual.
        console.log(`[${method}] ${url} - ${duration}ms`); //Imprime el método, URL y duración en milisegundos.
      }),
    );
  }
}
