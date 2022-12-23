import { Injectable } from '@nestjs/common';
import { AddressRepository } from 'src/address/repository/address.repository';
import { User } from 'src/entities/users.entity';
import { DataSource } from 'typeorm';
import { LaundryDto } from '../dto/laundryDto';
import { LaundriesRepository } from '../repository/laundries.repository';

@Injectable()
export class LaundriesService {
  constructor(
    private readonly laundriesRepository: LaundriesRepository,
    private readonly addressRepository: AddressRepository,
    private dataSource: DataSource,
  ) {}

  async createQueryRunner() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const { manager } = queryRunner;
    return { queryRunner, manager };
  }

  async createLaundry(user: User, laundryDto: LaundryDto) {
    const { queryRunner, manager } = await this.createQueryRunner();

    try {
      const addressDto = laundryDto.address;
      const laundry = laundryDto.toLaundryEntity();
      const address = addressDto.toAddressEntity();

      await this.addressRepository.createByTransaction(manager, address);
      laundry.user = user;
      laundry.address = address;

      console.log(laundry);

      await this.laundriesRepository.createByEm(manager, laundry);
      await queryRunner.commitTransaction();
      return laundry;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    }
  }

  async updateLaundry(user: User, laundryDto: LaundryDto) {
    const { queryRunner, manager } = await this.createQueryRunner();

    try {
      const foundLaundry = await this.laundriesRepository.findOneByUserId(user);

      const newAddress = laundryDto.address.toAddressEntity();
      newAddress.id = foundLaundry.address.id;

      const newLaundry = laundryDto.toLaundryEntity();
      newLaundry.id = foundLaundry.id;

      await this.addressRepository.updateOneInTransaction(manager, newAddress);

      await this.laundriesRepository.updateOneByEm(manager, newLaundry);

      queryRunner.commitTransaction();
    } catch (err) {
      queryRunner.rollbackTransaction();
      console.log(err);
    }
  }

  async findLaundry(laundryId: string) {
    const laundry = await this.laundriesRepository.findOne(laundryId);
    return laundry ? laundry : '세탁소가 없습니다.';
  }

  async findAllLaundry() {
    return await this.laundriesRepository.findAll();
  }

  async deleteLaundry(user: User) {
    const laundry = await this.laundriesRepository.findOneByUserId(user);
    return await this.laundriesRepository.deleteOne(laundry);
  }
}
