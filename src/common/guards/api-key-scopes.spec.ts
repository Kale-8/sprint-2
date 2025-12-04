import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiKeyScopesGuard } from './api-key-scopes.guard';
import { API_KEY_SCOPES_KEY } from 'src/modules/auth/dto/api-key-scopes.decorator';

describe('ApiKeyScopesGuard', () => {
  let guard: ApiKeyScopesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new ApiKeyScopesGuard(reflector);
  });

  function mockExecutionContext(apiKey?: any) {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ apiKey }),
      }),
      getHandler: () => {},
      getClass: () => {},
    } as unknown as ExecutionContext;
  }

  it('permite acceso si no se requieren scopes', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    const context = mockExecutionContext({ scopes: ['read'] });
    expect(guard.canActivate(context)).toBe(true);
  });

  it('permite acceso si el apiKey tiene los scopes requeridos', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['read']);
    const apiKey = { scopes: ['read', 'write'] };
    const context = mockExecutionContext(apiKey);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('lanza ForbiddenException si el apiKey no tiene scopes', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['read']);
    const context = mockExecutionContext({ scopes: [] });
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('lanza ForbiddenException si el apiKey no tiene scope requerido', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['delete']);
    const apiKey = { scopes: ['read', 'write'] };
    const context = mockExecutionContext(apiKey);
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
