import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepo: any;
  let jwtService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: { sign: jest.fn(() => 'token') },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepo = module.get(getRepositoryToken(Usuario));
    jwtService = module.get(JwtService);
  });

  it('login con credenciales correctas retorna tokens', async () => {
    const password = await bcrypt.hash('1234', 10);
    const user: Usuario = {
      id: 1,
      nombre: 'Test',
      email: 'test@test.com',
      password,
      rol: 'admin',
      productos: [],
      pedidos: [],
    };

    usersRepo.findOne.mockResolvedValue(user);

    const result = await service.validateUser('test@test.com', '1234');
    expect(result).toEqual(user);

    const tokens = await service.login(user);
    expect(tokens).toHaveProperty('accessToken');
    expect(tokens).toHaveProperty('refreshToken');
  });

  it('login con credenciales incorrectas lanza excepción', async () => {
    usersRepo.findOne.mockResolvedValue(null);
    await expect(service.validateUser('wrong@test.com', '1234'))
      .rejects.toThrow(UnauthorizedException);
  });

  it('validateUser con contraseña incorrecta lanza excepción', async () => {
    const password = await bcrypt.hash('1234', 10);
    const user: Usuario = {
      id: 1,
      nombre: 'Test',
      email: 'test@test.com',
      password,
      rol: 'admin',
      productos: [],
      pedidos: [],
    };

    usersRepo.findOne.mockResolvedValue(user);

    await expect(service.validateUser('test@test.com', 'wrongpass'))
      .rejects.toThrow(UnauthorizedException);
  });
});
