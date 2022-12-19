import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(userInfo: User) {
    return this.usersRepository.save(userInfo);
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
