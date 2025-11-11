import { AuditMiddleware } from '../src/common/middleware/audit.middleware';

describe('AuditMiddleware', () => {
  it('calls next and logs', () => {
    const mw = new AuditMiddleware();
    const req: any = { method: 'GET', originalUrl: '/', headers: {}, ip: '::1' };
    const events: any = {};
    const res: any = {
      statusCode: 200,
      on: (event: string, cb: any) => {
        events[event] = cb;
      },
    };
    const next = jest.fn();
    mw.use(req, res, next);
    expect(next).toHaveBeenCalled();
    // simulate finish
    events['finish']?.();
  });

  it('rejects non-json content-type on POST', () => {
    const mw = new AuditMiddleware();
    const req: any = { method: 'POST', originalUrl: '/', headers: { 'content-type': 'text/plain' } };
    const res: any = {
      code: 0,
      body: undefined,
      status(code: number) {
        this.code = code;
        return this;
      },
      json(body: any) {
        this.body = body;
        return this;
      },
      on() {},
    };
    const next = jest.fn();
    mw.use(req, res, next);
    expect(res.code).toBe(415);
    expect(next).not.toHaveBeenCalled();
  });
});


