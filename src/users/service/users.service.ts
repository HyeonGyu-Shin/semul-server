import { Injectable } from '@nestjs/common';
import { AddressRepository } from 'src/address/repository/address.repository';
import { SignUpRequestDto } from '../dto/signUpRequestDto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly addressRepository: AddressRepository,
  ) {}

  async createUser(signUpRequestDto: SignUpRequestDto) {
    const address = signUpRequestDto.toAddressEntity();
    const newAddress = await this.addressRepository.create(address);

    const user = signUpRequestDto.toUserEntity();
    user.address = newAddress;
    user.password = await this.hashPassword(user.password);

    const newUser = await this.usersRepository.create(user);
    console.log(newUser);
    return newUser.id;
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
