import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity/cliente.entity';


describe('ClienteService', () => {
  let service: ClienteService;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((cliente) => Promise.resolve({ id: 1, ...cliente })),
      find: jest.fn().mockResolvedValue([{ id: 1, nombre: 'Steven' }]),
    };

    service = new ClienteService(mockRepo);
  });

  it('debería crear un cliente', async () => {
    const dto = { nombre: 'Steven', direccion: 'Medellín' };
    const result = await service.create(dto);

    expect(result.nombre).toBe('Steven');
    expect(mockRepo.save).toHaveBeenCalled();
  });

  it('debería listar clientes', async () => {
    const result = await service.findAll();

    expect(result.length).toBeGreaterThan(0);
    expect(mockRepo.find).toHaveBeenCalled();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteService],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

  
