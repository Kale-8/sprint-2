import { Test, TestingModule } from '@nestjs/testing';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';

describe('ProductoController', () => {
  let controller: ProductoController;

  // Mock del ProductoService
  const mockProductoService = {
    crearProducto: jest.fn(),
    listarProductos: jest.fn(),
    actualizarProducto: jest.fn(),
    eliminarProducto: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoController],
      providers: [
        { provide: ProductoService, useValue: mockProductoService },
      ],
    }).compile();

    controller = module.get<ProductoController>(ProductoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});