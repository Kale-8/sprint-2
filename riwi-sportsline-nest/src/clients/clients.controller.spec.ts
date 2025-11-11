import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

describe('ClientsController (unit)', () => {
  let controller: ClientsController;
  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, nombre: 'Cliente' }]),
    findById: jest.fn().mockResolvedValue({ id: 1, nombre: 'Cliente' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [{ provide: ClientsService, useValue: mockService }],
    }).compile();
    controller = module.get(ClientsController);
  });

  it('should list clients', async () => {
    await expect(controller.findAll()).resolves.toHaveLength(1);
  });

  it('should get one client', async () => {
    await expect(controller.findOne(1)).resolves.toHaveProperty('id', 1);
  });
});


