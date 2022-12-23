import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/address/address.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(userInfo: User) {
    return await this.usersRepository.save(userInfo);
  }

  async createByTransaction(manager: EntityManager, user: User) {
    return await manager.save(user);
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findOneByEmailByTransaction(manager: EntityManager, email: string) {
    return await manager.findOne(User, { where: { email } });
  }

  async deleteOne(userId: string) {
    return await this.usersRepository.softDelete(userId);
  }
}
