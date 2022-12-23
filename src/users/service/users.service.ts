import { BadRequestException, Injectable } from '@nestjs/common';
import { AddressRepository } from 'src/address/repository/address.repository';
import { SignUpRequestDto } from '../dto/signUpRequestDto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../repository/users.repository';
import { DataSource } from 'typeorm';
import { User } from '../users.entity';
import { UserResponseDto } from '../dto/userResponseDto';
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly addressRepository: AddressRepository,
    private readonly dataSource: DataSource,
  ) {}

  async createQueryRunner() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const { manager } = queryRunner;
    return { queryRunner, manager };
  }

  async createUser(signUpRequestDto: SignUpRequestDto) {
    const { queryRunner, manager } = await this.createQueryRunner();

    try {
      const user = signUpRequestDto.toUserEntity();
      const address = signUpRequestDto.toAddressEntity();

      const foundUser = await this.usersRepository.findOneByEmail(user.email);

      if (foundUser) throw new BadRequestException('중복된 이메일입니다.');

      user.address = await this.addressRepository.createByTransaction(
        manager,
        address,
      );
      user.password = await this.hashPassword(user.password);

      const newUser = await this.usersRepository.createByEm(manager, user);

      await queryRunner.commitTransaction();

      return newUser.id;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    }
  }

  async findOneUser(user: User) {
    const { name, email, phoneNumber, bizType } = user;
    const { roadAddr, detailAddr, jibun } = user.address;
    const { money } = user.wallet;
    return UserResponseDto.EntityToDto(
      name,
      email,
      phoneNumber,
      { roadAddr, detailAddr, jibun },
      money,
      bizType,
    );
  }

  async deleteUser(user: User) {
    return this.usersRepository.deleteOne(user.id);
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
