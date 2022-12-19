import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    const user = signUpRequestDto.toUserEntity();
    const address = signUpRequestDto.toAddressEntity();

    const foundUser = await this.usersRepository.findOneByEmail(user.email);

    if (foundUser) throw new BadRequestException('중복된 이메일입니다.');

    const newAddress = await this.addressRepository.create(address);

    if (!newAddress)
      throw new InternalServerErrorException(
        '주소가 제대로 생성되지 않았습니다.',
      );

    user.address = newAddress;
    user.password = await this.hashPassword(user.password);

    const newUser = await this.usersRepository.create(user);

    return newUser.id;
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
