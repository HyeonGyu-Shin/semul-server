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

  async create(userInfo) {
    return this.usersRepository.save(userInfo);
  }

  async checkEmailDuplicated(email: string) {
    const result = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

    if (result) throw new BadRequestException('이메일이 중복됩니다.');

    return;
  }

  async findUserByEmailForLogIn(userEmail: string) {
    const user = await this.usersRepository.findOneBy({ email: userEmail });

    if (!user) throw new Error('유저가 존재하지 않습니다!');

    return user;
  }
}
