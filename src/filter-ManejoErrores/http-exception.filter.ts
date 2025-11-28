import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

//ExceptionFilter: interfaz que define el método catch() para manejar excepciones.
//Catch: decorador que indica qué tipo de errores debe capturar (en este caso, todos).
//ArgumentsHost: objeto que te da acceso al contexto de ejecución (HTTP, RPC, WebSocket).
//HttpException: clase base para errores HTTP como BadRequestException, NotFoundException, etc.
//HttpStatus: enum con todos los códigos de estado HTTP (200, 404, 500, etc.).

@Catch() //Indica que este filtro captura todas las excepciones y errores.
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); //Cambiamos al contexto HTTP req y res para manejar la respuesta.
    const response = ctx.getResponse(); //Enviamos el JSON con el error
    const request = ctx.getRequest(); //Aca esta la ruta que causo el error

    const status =
      exception instanceof HttpException //Verifica si el error es de HTTPException
        ? exception.getStatus() //Si es asi, obtiene el codigo de estado
        : HttpStatus.INTERNAL_SERVER_ERROR; //Si no, asigna 500 (error interno del servidor)

    const message =
      exception instanceof HttpException //Verifica si el error es de HTTPException
        ? exception.getResponse() //Si lo es, obtiene el mensaje
        : 'Internal server error'; // Si no, asigna un mensaje generico

    response.status(status).json({
      //Envia la respuesta JSON con el error al cliente
      statusCode: status, //código HTTP (404, 500, etc.)
      timestamp: new Date().toISOString(), //Hora del error en formato ISO
      path: request.url, //Ruta que causo el error
      message: message, //Mensaje de error detallado
    });
  }
}
