import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const startedAt = Date.now();
    const { method, originalUrl } = req;
    const ip = req.ip;

    // Simple validation: enforce JSON on mutating methods
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const contentType = req.headers['content-type'] ?? '';
      if (!String(contentType).includes('application/json')) {
        res
          .status(415)
          .json({ error: 'Unsupported Media Type. Use application/json' });
        return;
      }
    }

    res.on('finish', () => {
      const durationMs = Date.now() - startedAt;
      this.logger.log(
        `${method} ${originalUrl} ${res.statusCode} - ${durationMs}ms - ${ip}`,
      );
    });
    next();
  }
}
