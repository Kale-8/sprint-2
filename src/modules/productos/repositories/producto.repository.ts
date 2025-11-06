import { EntityRepository, Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';

@EntityRepository(Producto)
export class ProductoRepository extends Repository<Producto> {
  async findByStock(minStock: number) {
    return this.find({ where: { stock: minStock } });
  }
}
