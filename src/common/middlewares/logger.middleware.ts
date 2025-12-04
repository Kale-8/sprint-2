import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    const { method, originalUrl, ip } = req;
    const userAgent = req.headers['user-agent'] || 'unknown';

    res.on('finish', () => {
      const responseTime = Date.now() - start;

      console.log(
        `[AUDIT] ${new Date().toISOString()} | ${method} ${originalUrl} | ` +
        `Status: ${res.statusCode} | ${responseTime}ms | IP: ${ip} | User-Agent: ${userAgent}`
      );
    });

    next();
  }
}
