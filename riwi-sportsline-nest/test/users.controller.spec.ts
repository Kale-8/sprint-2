import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUsersService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, nombre: 'Admin' }]),
    findById: jest.fn().mockResolvedValue({ id: 1, nombre: 'Admin' }),
    create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should return users list', async () => {
    await expect(controller.findAll()).resolves.toEqual([{ id: 1, nombre: 'Admin' }]);
  });

  it('should return one user', async () => {
    await expect(controller.findOne(1)).resolves.toEqual({ id: 1, nombre: 'Admin' });
  });

  it('should create user', async () => {
    await expect(
      controller.create({ nombre: 'A', email: 'a@b.co', passwordHash: '1234567890', rol: 'admin' }),
    ).resolves.toEqual(expect.objectContaining({ id: 1, nombre: 'A' }));
  });
});


