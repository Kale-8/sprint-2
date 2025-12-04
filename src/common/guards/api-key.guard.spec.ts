import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyGuard } from './api-key.guard';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApiKey } from 'src/modules/auth/entities/api-key.entity';
import { UnauthorizedException, ForbiddenException } from '@nestjs/common';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;
  let apiKeyRepo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyGuard,
        {
          provide: getRepositoryToken(ApiKey),
          useValue: { findOne: jest.fn() },
        },
      ],
    }).compile();

    guard = module.get<ApiKeyGuard>(ApiKeyGuard);
    apiKeyRepo = module.get(getRepositoryToken(ApiKey));
  });

  function mockRequest(apiKey?: string) {
    return { headers: { 'x-api-key': apiKey } };
  }

  function mockExecutionContext(apiKey?: string) {
    return {
      switchToHttp: () => ({ getRequest: () => mockRequest(apiKey) }),
    } as any;
  }

  it('lanza UnauthorizedException si no se envía x-api-key', async () => {
    const context = mockExecutionContext();
    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
  });

  it('lanza ForbiddenException si la key no existe', async () => {
    apiKeyRepo.findOne.mockResolvedValue(null);
    const context = mockExecutionContext('invalid-key');
    await expect(guard.canActivate(context)).rejects.toThrow(ForbiddenException);
  });

  it('permite acceso si la key es válida', async () => {
    const key = { id: 1, key: 'valid-key', name: 'Test', scopes: ['read'] };
    apiKeyRepo.findOne.mockResolvedValue(key);
    const context = mockExecutionContext('valid-key');
    await expect(guard.canActivate(context)).resolves.toBe(true);
  });
});
