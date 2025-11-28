import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity/cliente.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ClienteService', () => {
  let service: ClienteService;
  let repo: Repository<Cliente>;

  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        {
          provide: getRepositoryToken(Cliente),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    repo = module.get<Repository<Cliente>>(getRepositoryToken(Cliente));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un cliente', async () => {
    const dto = { nombre: 'Steven', direccion: 'Calle 123' };
    const cliente = { id: 1, nombre: 'Steven', direccion: 'Calle 123' };

    mockRepo.create.mockReturnValue(cliente);
    mockRepo.save.mockResolvedValue(cliente);

    const result = await service.create(dto);
    expect(result).toEqual(cliente);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(mockRepo.save).toHaveBeenCalledWith(cliente);
  });

  it('debería listar clientes', async () => {
    const clientes = [{ id: 1, nombre: 'Steven' }];
    mockRepo.find.mockResolvedValue(clientes);

    const result = await service.findAll();
    expect(result).toEqual(clientes);
    expect(mockRepo.find).toHaveBeenCalledTimes(1);
  });
});
