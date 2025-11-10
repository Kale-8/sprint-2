import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity/producto.entity';
import { CreateProductoDto } from './create-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) {}

  async create(dto: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepo.create(dto);
    return this.productoRepo.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return this.productoRepo.find();
  }
}
