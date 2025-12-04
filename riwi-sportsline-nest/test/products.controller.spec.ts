import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../src/products/products.controller';
import { ProductsService } from '../src/products/products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  const mockService = {
    findAll: jest
      .fn()
      .mockResolvedValue([{ id: 1, nombre: 'Balón', codigo: 'SKU-001' }]),
    findById: jest
      .fn()
      .mockResolvedValue({ id: 1, nombre: 'Balón', codigo: 'SKU-001' }),
    create: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockService }],
    }).compile();
    controller = module.get<ProductsController>(ProductsController);
  });

  it('list products', async () => {
    await expect(controller.findAll()).resolves.toHaveLength(1);
  });

  it('get one', async () => {
    await expect(controller.findOne(1)).resolves.toHaveProperty(
      'codigo',
      'SKU-001',
    );
  });

  it('create product', async () => {
    await expect(
      controller.create({
        codigo: 'SKU-002',
        nombre: 'Guayos',
        precio: '200.00',
        stock: 2,
      }),
    ).resolves.toHaveProperty('codigo', 'SKU-002');
  });
});
