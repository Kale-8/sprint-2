import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpAllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exceptions');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : ((res as any).message ?? res);
    } else if (
      exception &&
      typeof exception === 'object' &&
      'status' in (exception as any)
    ) {
      status = (exception as any).status ?? status;
      message = (exception as any).message ?? message;
    }

    this.logger.error(
      `[${status}] ${request.method} ${request.url} - ${JSON.stringify(message)}`,
    );
    response.status(status).json({
      error: {
        statusCode: status,
        path: request.url,
        method: request.method,
        message,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
