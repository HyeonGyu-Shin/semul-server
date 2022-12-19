import { Injectable } from '@nestjs/common';
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

  async create(userInfo) {
    if (!userInfo.address) {
      throw new Error('주소 정보가 없습니다.');
    }

    return this.usersRepository.save(userInfo);
  }
}
