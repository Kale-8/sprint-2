import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  findAll() {
    return this.clientRepository.find();
  }

  findById(id: number) {
    return this.clientRepository.findOne({ where: { id } });
  }

  async create(payload: Partial<Client>) {
    const entity = this.clientRepository.create(payload);
    return this.clientRepository.save(entity);
  }

  async update(id: number, changes: Partial<Client>) {
    await this.clientRepository.update({ id }, changes);
    return this.findById(id);
  }

  async remove(id: number) {
    await this.clientRepository.delete({ id });
  }
}
