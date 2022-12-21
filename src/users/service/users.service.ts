import { BadRequestException, Injectable } from '@nestjs/common';
import { AddressRepository } from 'src/address/repository/address.repository';
import { SignUpRequestDto } from '../dto/signUpRequestDto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../repository/users.repository';
import { DataSource } from 'typeorm';
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

      const foundUser = await this.usersRepository.findOneByEmailByTransaction(
        manager,
        user.email,
      );

      if (foundUser) throw new BadRequestException('중복된 이메일입니다.');

      user.address = await this.addressRepository.createByTransaction(
        manager,
        address,
      );
      user.password = await this.hashPassword(user.password);

      const newUser = await this.usersRepository.createByTransaction(
        manager,
        user,
      );

      await queryRunner.commitTransaction();

      return newUser.id;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    }
  }

  async deleteUser(userId: string) {
    return this.usersRepository.deleteOne(userId);
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
