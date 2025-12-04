import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(payload: Partial<User>) {
    const entity = this.userRepository.create(payload);
    return this.userRepository.save(entity);
  }

  async update(id: number, changes: Partial<User>) {
    await this.userRepository.update({ id }, changes);
    return this.findById(id);
  }

  async remove(id: number) {
    await this.userRepository.delete({ id });
  }
}
