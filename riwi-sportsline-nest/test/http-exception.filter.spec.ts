import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAllExceptionsFilter } from '../src/common/filters/http-exception.filter';

const mockHost = () =>
  ({
    switchToHttp: () => ({
      getResponse: () => ({
        status: function (code: number) {
          this.code = code;
          return this;
        },
        json: function (body: any) {
          this.body = body;
          return this;
        },
      }),
      getRequest: () => ({ url: '/x', method: 'GET' }),
    }),
  } as unknown as ArgumentsHost);

describe('HttpAllExceptionsFilter', () => {
  it('formats HttpException', () => {
    const filter = new HttpAllExceptionsFilter();
    const host = mockHost();
    const res: any = host.switchToHttp().getResponse();
    filter.catch(new HttpException('Bad', HttpStatus.BAD_REQUEST), host);
    expect(res.code).toBe(400);
    expect(res.body.error.statusCode).toBe(400);
  });
});


