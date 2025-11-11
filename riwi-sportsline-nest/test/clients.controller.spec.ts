import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from '../src/clients/clients.controller';
import { ClientsService } from '../src/clients/clients.service';

describe('ClientsController', () => {
  let controller: ClientsController;
  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, nombre: 'Cliente Demo' }]),
    findById: jest.fn().mockResolvedValue({ id: 1, nombre: 'Cliente Demo' }),
    create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [{ provide: ClientsService, useValue: mockService }],
    }).compile();
    controller = module.get<ClientsController>(ClientsController);
  });

  it('list clients', async () => {
    await expect(controller.findAll()).resolves.toHaveLength(1);
  });

  it('get one', async () => {
    await expect(controller.findOne(1)).resolves.toHaveProperty('id', 1);
  });

  it('create client', async () => {
    await expect(
      controller.create({ nombre: 'Nuevo', email: 'nuevo@riwi.co', telefono: '123' }),
    ).resolves.toHaveProperty('email', 'nuevo@riwi.co');
  });
});


