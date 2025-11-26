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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('Pedidos')
@Controller('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo pedido', 
    description: 'Crea un nuevo pedido en el sistema' 
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Pedido creado exitosamente',
    schema: {
      example: {
        id: '60d0fe4f5311236168a109dd',
        orderDate: '2023-01-01T00:00:00.000Z',
        total: 59.98,
        status: 'PENDING',
        paymentMethod: 'CREDIT_CARD',
        client: {
          id: '60d0fe4f5311236168a109ca',
          name: 'Juan Pérez'
        },
        user: {
          id: '60d0fe4f5311236168a109cc',
          name: 'Vendedor Ejemplo'
        },
        orderItems: [
          {
            id: '60d0fe4f5311236168a109de',
            quantity: 2,
            price: 29.99,
            product: {
              id: '60d0fe4f5311236168a109cb',
              name: 'Camiseta de algodón',
              sku: 'TSHIRT-BLK-M'
            }
          }
        ]
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Datos de entrada inválidos' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Cliente o producto no encontrado' 
  })
  @ApiBody({ type: CreateOrderDto })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los pedidos', 
    description: 'Obtiene una lista paginada de todos los pedidos' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Lista de pedidos obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          orderDate: { type: 'string', format: 'date-time' },
          total: { type: 'number' },
          status: { 
            type: 'string', 
            enum: ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'] 
          },
          paymentMethod: { 
            type: 'string', 
            enum: ['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'OTHER'] 
          },
          client: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' }
            }
          },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'No autorizado' 
  })
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener un pedido por ID', 
    description: 'Obtiene la información detallada de un pedido específico' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del pedido',
    example: '60d0fe4f5311236168a109dd'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Pedido encontrado',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        orderDate: { type: 'string', format: 'date-time' },
        total: { type: 'number' },
        status: { 
          type: 'string', 
          enum: ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'] 
        },
        paymentMethod: { 
          type: 'string', 
          enum: ['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'OTHER'] 
        },
        client: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' }
          }
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' }
          }
        },
        orderItems: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              quantity: { type: 'number' },
              price: { type: 'number' },
              product: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  sku: { type: 'string' },
                  price: { type: 'number' }
                }
              }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Pedido no encontrado' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'No autorizado' 
  })
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar un pedido', 
    description: 'Actualiza la información de un pedido existente' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del pedido a actualizar',
    example: '60d0fe4f5311236168a109dd'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Pedido actualizado exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        status: { 
          type: 'string', 
          enum: ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'] 
        },
        paymentMethod: { 
          type: 'string', 
          enum: ['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'OTHER'] 
        },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Pedido no encontrado' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Datos de entrada inválidos' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'No autorizado' 
  })
  @ApiBody({ type: UpdateOrderDto })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar un pedido', 
    description: 'Elimina un pedido del sistema (eliminación lógica)' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del pedido a eliminar',
    example: '60d0fe4f5311236168a109dd'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Pedido eliminado exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Pedido eliminado exitosamente' },
        orderId: { type: 'string', example: '60d0fe4f5311236168a109dd' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Pedido no encontrado' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'No autorizado' 
  })
  async remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
