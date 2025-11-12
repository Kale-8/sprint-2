//Vamos a probar que se ejecute correctamente mida el tiempo y muestre el consolo log esperado.

import { LoggingInterceptor } from './logging.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of, lastValueFrom } from 'rxjs'; //Esto crea un observable simple para simular la respuesta del controlador.


describe('LoggingInterceptor', () => {
  it('debería registrar el tiempo de ejecución', async () => {
    const interceptor = new LoggingInterceptor();
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ method: 'GET', url: '/cliente' }),
      }),
    } as ExecutionContext;

    const handler: CallHandler = {
      handle: () => of('respuesta'),
    };

    const spy = jest.spyOn(console, 'log');

    await lastValueFrom(interceptor.intercept(context, handler));

    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/\[GET\] \/cliente - \d+ms/));
  });
});
