import { Test, TestingModule } from '@nestjs/testing';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity/producto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductoService', () => {
  let service: ProductoService;

  const mockProductoRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductoService,
        { provide: getRepositoryToken(Producto), useValue: mockProductoRepository },
      ],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


// describe('ProductoService', () => {
//   let service: ProductoService;
//   let mockRepo: any;

//   beforeEach(() => {
//     // 🧪 Creamos un repositorio simulado con funciones mock
//     mockRepo = {
//       create: jest.fn().mockImplementation((dto) => dto),
//       save: jest.fn().mockImplementation((producto) => Promise.resolve({ id: 1, ...producto })),
//       find: jest.fn().mockResolvedValue([{ id: 1, nombre: 'Balón' }]),
//     };
    
//     // 🧪 Inyectamos el mock en el servicio
//     service = new ProductoService(mockRepo);
//   });

//   it('debería crear un producto', async () => {
//     const dto = { nombre: 'Balón', precio: 120000, stock: 10 };
//     const result = await service.create(dto);

//     expect(result.nombre).toBe('Balón'); // ✅ Verifica que el nombre sea correcto
//     expect(mockRepo.save).toHaveBeenCalled(); // ✅ Verifica que se haya llamado a save()
//   });

//   it('debería listar productos', async () => {
//     const result = await service.findAll();

//     expect(result.length).toBeGreaterThan(0); // ✅ Verifica que haya al menos un producto
//     expect(mockRepo.find).toHaveBeenCalled(); // ✅ Verifica que se haya llamado a find()
//   });

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [ProductoService],
//     }).compile();

//     service = module.get<ProductoService>(ProductoService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
  
// });

