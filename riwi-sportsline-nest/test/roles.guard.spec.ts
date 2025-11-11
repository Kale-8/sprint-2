import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../src/common/guards/roles.guard';

const makeContext = (role?: string) =>
  ({
    switchToHttp: () => ({
      getRequest: () => ({ user: role ? { rol: role } : undefined }),
    }),
    getHandler: () => ({}),
    getClass: () => ({}),
  } as any);

describe('RolesGuard', () => {
  it('allows when no roles are required', () => {
    const reflector = { getAllAndOverride: () => undefined } as unknown as Reflector;
    const guard = new RolesGuard(reflector);
    expect(guard.canActivate(makeContext('admin'))).toBe(true);
  });

  it('denies when user role not present', () => {
    const reflector = { getAllAndOverride: () => ['admin'] } as unknown as Reflector;
    const guard = new RolesGuard(reflector);
    expect(guard.canActivate(makeContext('vendedor'))).toBe(false);
  });

  it('allows when role matches', () => {
    const reflector = { getAllAndOverride: () => ['admin'] } as unknown as Reflector;
    const guard = new RolesGuard(reflector);
    expect(guard.canActivate(makeContext('admin'))).toBe(true);
  });
});


