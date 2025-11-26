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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Usuarios')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario', description: 'Crea un nuevo usuario en el sistema' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Usuario creado exitosamente',
    schema: {
      example: {
        id: '60d0fe4f5311236168a109ca',
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@ejemplo.com',
        isActive: true,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Datos de entrada inválidos' 
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'El correo electrónico ya está en uso' 
  })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios', description: 'Obtiene una lista de todos los usuarios registrados' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Lista de usuarios obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '60d0fe4f5311236168a109ca' },
          firstName: { type: 'string', example: 'Juan' },
          lastName: { type: 'string', example: 'Pérez' },
          email: { type: 'string', example: 'juan.perez@ejemplo.com' },
          isActive: { type: 'boolean', example: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'No autorizado' 
  })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID', description: 'Obtiene la información detallada de un usuario específico' })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del usuario',
    example: '60d0fe4f5311236168a109ca'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Usuario encontrado',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '60d0fe4f5311236168a109ca' },
        firstName: { type: 'string', example: 'Juan' },
        lastName: { type: 'string', example: 'Pérez' },
        email: { type: 'string', example: 'juan.perez@ejemplo.com' },
        isActive: { type: 'boolean', example: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        roles: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '60d0fe4f5311236168a109cb' },
              name: { type: 'string', example: 'admin' },
              description: { type: 'string', example: 'Administrador del sistema' }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Usuario no encontrado' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'No autorizado' 
  })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario', description: 'Actualiza la información de un usuario existente' })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del usuario a actualizar',
    example: '60d0fe4f5311236168a109ca'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Usuario actualizado exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '60d0fe4f5311236168a109ca' },
        firstName: { type: 'string', example: 'Juan Carlos' },
        lastName: { type: 'string', example: 'Pérez' },
        email: { type: 'string', example: 'juan.perez@ejemplo.com' },
        isActive: { type: 'boolean', example: true },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Usuario no encontrado' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'No autorizado' 
  })
  @ApiBody({ type: UpdateUserDto })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario', description: 'Elimina un usuario del sistema (eliminación lógica)' })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del usuario a eliminar',
    example: '60d0fe4f5311236168a109ca'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Usuario eliminado exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Usuario eliminado exitosamente' },
        userId: { type: 'string', example: '60d0fe4f5311236168a109ca' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Usuario no encontrado' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'No autorizado' 
  })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
