import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl } = req as any;
    const bodyPreview = (() => {
      try {
        const raw = JSON.stringify(req.body);
        return raw && raw.length > 200 ? raw.substring(0, 200) + '…' : raw;
      } catch {
        return '';
      }
    })();

    const ts = new Date().toISOString();
    console.log(`[${ts}] --> ${method} ${originalUrl} body=${bodyPreview || '{}'} `);

    res.on('finish', () => {
      const duration = Date.now() - start;
      const status = res.statusCode;
      const tsDone = new Date().toISOString();
      console.log(`[${tsDone}] <-- ${method} ${originalUrl} ${status} ${duration}ms`);
    });

    next();
  }
}
