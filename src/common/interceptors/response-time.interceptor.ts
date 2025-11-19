import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - start;
        try {
          res.setHeader('X-Response-Time', `${ms}ms`);
        } catch {}
      })
    );
  }
}
