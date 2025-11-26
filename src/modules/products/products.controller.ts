import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpStatus, 
  UseGuards 
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiBearerAuth,
  ApiBody
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Productos')
@Controller('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo producto', 
    description: 'Crea un nuevo producto en el catálogo' 
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Producto creado exitosamente',
    schema: {
      example: {
        id: '60d0fe4f5311236168a109cb',
        name: 'Camiseta de algodón',
        description: 'Camiseta 100% algodón, disponible en varios colores',
        price: 29.99,
        stock: 100,
        sku: 'TSHIRT-BLK-M',
        createdAt: '2023-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Datos de entrada inválidos' 
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'El SKU ya está en uso' 
  })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los productos', 
    description: 'Obtiene una lista paginada de todos los productos disponibles' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Lista de productos obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '60d0fe4f5311236168a109cb' },
          name: { type: 'string', example: 'Camiseta de algodón' },
          price: { type: 'number', example: 29.99 },
          stock: { type: 'number', example: 100 },
          sku: { type: 'string', example: 'TSHIRT-BLK-M' },
          createdAt: { type: 'string', format: 'date-time' }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'No autorizado' 
  })
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener un producto por ID', 
    description: 'Obtiene la información detallada de un producto específico' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del producto',
    example: '60d0fe4f5311236168a109cb'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Producto encontrado',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '60d0fe4f5311236168a109cb' },
        name: { type: 'string', example: 'Camiseta de algodón' },
        description: { type: 'string', example: 'Camiseta 100% algodón' },
        price: { type: 'number', example: 29.99 },
        stock: { type: 'number', example: 100 },
        sku: { type: 'string', example: 'TSHIRT-BLK-M' },
        createdAt: { type: 'string', format: 'date-time' },
        orderItems: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              quantity: { type: 'number' },
              price: { type: 'number' },
              orderId: { type: 'string' }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Producto no encontrado' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'No autorizado' 
  })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar un producto', 
    description: 'Actualiza la información de un producto existente' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del producto a actualizar',
    example: '60d0fe4f5311236168a109cb'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Producto actualizado exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '60d0fe4f5311236168a109cb' },
        name: { type: 'string', example: 'Camiseta de algodón actualizada' },
        price: { type: 'number', example: 34.99 },
        stock: { type: 'number', example: 150 },
        sku: { type: 'string', example: 'TSHIRT-BLK-M' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Producto no encontrado' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'No autorizado' 
  })
  @ApiBody({ type: UpdateProductDto })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar un producto', 
    description: 'Elimina un producto del catálogo' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del producto a eliminar',
    example: '60d0fe4f5311236168a109cb'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Producto eliminado exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Producto eliminado exitosamente' },
        productId: { type: 'string', example: '60d0fe4f5311236168a109cb' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Producto no encontrado' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'No autorizado' 
  })
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
