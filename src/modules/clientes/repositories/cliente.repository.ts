import { EntityRepository, Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';

@EntityRepository(Cliente)
export class ClienteRepository extends Repository<Cliente> {
  async findByTelefono(telefono: string) {
    return this.findOne({ where: { telefono } });
  }
}
