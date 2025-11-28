import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { Role } from './role/role.entity';

describe('UsuarioService', () => {
  let service: UsuarioService;

  const mockUsuarioRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  const mockRoleRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockUsuarioRepository,
        },
        { provide: getRepositoryToken(Role), useValue: mockRoleRepository },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

// import { Test, TestingModule } from '@nestjs/testing';
// import { UsuarioService } from './usuario.service';
// import { Usuario } from './usuario.entity';

// describe('UsuarioService', () => {
//   let service: UsuarioService;
//   let mockRepo: any;

// beforeEach(() => {
//     mockRepo = {
//       create: jest.fn().mockImplementation((dto) => dto),
//       save: jest.fn().mockImplementation((usuario) => Promise.resolve({ id: 1, ...usuario })),
//       find: jest.fn().mockResolvedValue([{ id: 1, nombre: 'Laura' }]),
//     };

//     service = new UsuarioService(mockRepo);
//   });

//   it('debería crear un usuario', async () => {
//     const dto = { nombre: 'Laura', email: 'laura@mail.com', password: '123456' };
//     const result = await service.create(dto);

//     expect(result.email).toBe('laura@mail.com');
//     expect(mockRepo.save).toHaveBeenCalled();
//   });

//   it('debería listar usuarios', async () => {
//     const result = await service.findAll();

//     expect(result.length).toBeGreaterThan(0);
//     expect(mockRepo.find).toHaveBeenCalled();
//   });

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UsuarioService],
//     }).compile();

//     service = module.get<UsuarioService>(UsuarioService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
