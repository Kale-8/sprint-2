import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find();
  }

  findById(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(payload: Partial<Product>) {
    const entity = this.productRepository.create(payload);
    return this.productRepository.save(entity);
  }

  async update(id: number, changes: Partial<Product>) {
    await this.productRepository.update({ id }, changes);
    return this.findById(id);
  }

  async remove(id: number) {
    await this.productRepository.delete({ id });
  }
}


