import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let repo: Repository<Usuario>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: getRepositoryToken(Usuario),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    repo = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  });

  it(' debería estar definido el servicio', () => {
    expect(service).toBeDefined();
  });

  it(' debería llamar a repo.find() en findAll()', async () => {
    const usuarios = [{ id: 1, nombre: 'Juan', email: 'test@test.com', password: '1234', rol: 'admin' }];
    jest.spyOn(repo, 'find').mockResolvedValue(usuarios as any);

    const result = await service.findAll();
    expect(result).toEqual(usuarios);
  });
});
