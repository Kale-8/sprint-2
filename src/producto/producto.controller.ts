import { Controller, UseGuards } from '@nestjs/common';
import { Body, Post, Get } from '@nestjs/common/decorators';
import { CreateProductoDto } from './create-producto.dto';
import { ProductoService } from './producto.service';
import { Roles } from '../guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Usuarios') // Agrupa los endpoints en Swagger
@ApiBearerAuth('jwt-authSw') // Indica que se usa JWT
@UseGuards(JwtAuthGuard, RolesGuard) // Protege el controlador con el guard osea despues de autenticar con JWT el token
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post() //METODO para crear producto a la base de datos
  @Roles('admin') // Solo admins pueden crear nuevos productos.
  create(@Body() dto: CreateProductoDto) {
    return this.productoService.create(dto);
  }

  @Get() // METODO para listar todos los productos disponibles en la base de datos.
  findAll() {
    return this.productoService.findAll();
  }
}
