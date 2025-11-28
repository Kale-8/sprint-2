//Vamos a probar que lea roles del metadata y compare con user.role permita acceso o no y reflector funcione bien.

import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, Type, ForbiddenException } from '@nestjs/common';

export interface HttpArgumentsHost {
  getRequest<T = any>(): T;
  getResponse<T = any>(): T;
  getNext<T = any>(): T;
}

class DummyController {}

describe('RolesGuard', () => {
  
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('debería permitir acceso si el rol coincide', () => {
    const mockContext: Partial<ExecutionContext> = {
      getHandler: () => jest.fn(),
      getClass: () => DummyController as Type<any>, 
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'admin' } }) as any,
        getResponse: () => ({} as any),                             
        getNext: () => jest.fn() as any,                             
      }), 
    };

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);

    expect(guard.canActivate(mockContext as ExecutionContext)).toBe(true);
  });

  it('debería bloquear acceso si el rol no coincide', () => {
    const mockContext: Partial<ExecutionContext> = {
      getHandler: () => jest.fn(),
      getClass: () => DummyController as Type<any>, 
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'user' } }) as any,
        getResponse: () => ({} as any),                             
        getNext: () => jest.fn() as any,                             
      }),
    };

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
    
    expect(() => guard.canActivate(mockContext as ExecutionContext))
    .toThrow(ForbiddenException);
  });

  it('debería permitir acceso si no hay roles definidos', () => {
  const mockContext: Partial<ExecutionContext> = {
    getHandler: () => jest.fn(),
    getClass: () => DummyController as Type<any>,
    switchToHttp: () => ({
      getRequest: () => ({ user: { role: 'admin' } }) as any,
      getResponse: () => ({} as any),
      getNext: () => jest.fn() as any,
    }),
  };

  jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

  expect(guard.canActivate(mockContext as ExecutionContext)).toBe(true);
  });

  it('debería lanzar ForbiddenException si no hay usuario', () => {
  const mockContext: Partial<ExecutionContext> = {
    getHandler: () => jest.fn(),
    getClass: () => DummyController as Type<any>,
    switchToHttp: () => ({
      getRequest: () => ({ user: { role: 'user' } }) as any,
      getResponse: () => ({} as any),
      getNext: () => jest.fn() as any,
    }),
  };

  jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);

  expect(() => guard.canActivate(mockContext as ExecutionContext))
    .toThrow(ForbiddenException);
  });

});





