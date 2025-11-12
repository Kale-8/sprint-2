//Vamos a probar que lea roles del metadata y compare con user.role permita acceso o no y reflector funcione bien.

import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

describe('RolesGuard', () => {
  it('debería permitir acceso si el rol coincide', () => {
    const reflector = new Reflector();
    const guard = new RolesGuard(reflector);

    jest.spyOn(reflector, 'get').mockReturnValue(['admin']);

    const context = {
      getHandler: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'admin' } }),
      }),
    } as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
  });

  it('debería bloquear acceso si el rol no coincide', () => {
    const reflector = new Reflector();
    const guard = new RolesGuard(reflector);

    jest.spyOn(reflector, 'get').mockReturnValue(['admin']);

    const context = {
      getHandler: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'cliente' } }),
      }),
    } as ExecutionContext;

    expect(guard.canActivate(context)).toBe(false);
  });
});
