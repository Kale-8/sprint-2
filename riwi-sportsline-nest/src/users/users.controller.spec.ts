import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController (unit)', () => {
  let controller: UsersController;
  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, nombre: 'Admin' }]),
    findById: jest.fn().mockResolvedValue({ id: 1, nombre: 'Admin' }),
    create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockService }],
    }).compile();
    controller = module.get(UsersController);
  });

  it('should list users', async () => {
    await expect(controller.findAll()).resolves.toHaveLength(1);
  });

  it('should get user by id', async () => {
    await expect(controller.findOne(1)).resolves.toHaveProperty('id', 1);
  });
});


