import { Controller, } from '@nestjs/common';
import { Body, Post, Get } from '@nestjs/common/decorators';
import { CreateProductoDto } from './create-producto.dto';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}

    @Post()
    create(@Body() dto: CreateProductoDto) {
        return this.productoService.create(dto);
    }

    @Get()
    findAll() {
        return this.productoService.findAll();
    }

}

