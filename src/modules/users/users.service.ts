import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashed = await bcrypt.hash(dto.password, 10);

    const user = this.repo.create({
      ...dto,
      password: hashed,
    });

    return this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find({
      relations: ['roles'], // Include roles in the result
      where: { isActive: true }, // Only return active users by default
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.repo.findOne({ 
      where: { id },
      relations: ['roles'], // Include roles in the result
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    // If password is being updated, hash the new password
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    
    Object.assign(user, dto);
    return this.repo.save(user);
  }

  async remove(id: string): Promise<void> {
    // Soft delete by setting isActive to false
    await this.repo.update(id, { isActive: false });
  }
}
