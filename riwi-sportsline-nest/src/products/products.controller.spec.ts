import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController (unit)', () => {
  let controller: ProductsController;
  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, codigo: 'SKU-001' }]),
    findById: jest.fn().mockResolvedValue({ id: 1, codigo: 'SKU-001' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockService }],
    }).compile();
    controller = module.get(ProductsController);
  });

  it('should list products', async () => {
    await expect(controller.findAll()).resolves.toHaveLength(1);
  });

  it('should get one', async () => {
    await expect(controller.findOne(1)).resolves.toHaveProperty('id', 1);
  });
});


