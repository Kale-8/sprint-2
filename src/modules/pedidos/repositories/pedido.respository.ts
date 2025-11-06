import { EntityRepository, Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';

@EntityRepository(Pedido)
export class PedidoRepository extends Repository<Pedido> {
  async findByCliente(clienteId: number) {
    return this.find({ where: { cliente: { id: clienteId } }, relations: ['productos', 'cliente'] });
  }
}
