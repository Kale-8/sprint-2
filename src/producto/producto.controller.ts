import { Controller, UseGuards } from '@nestjs/common';
import { Body, Post, Get } from '@nestjs/common/decorators';
import { CreateProductoDto } from './create-producto.dto';
import { ProductoService } from './producto.service';
import { Roles } from '../guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}

    @Post() //METODO para crear producto a la base de datos 
    @UseGuards(AuthGuard('jwt'), RolesGuard) //  Protegido por JWT y roles
    @Roles('admin') // Solo admins pueden crear nuevos productos.
    create(@Body() dto: CreateProductoDto) {
        return this.productoService.create(dto);
    }

    @Get() // METODO para listar todos los productos disponibles en la base de datos.
    findAll() {
        return this.productoService.findAll();
    }

}

