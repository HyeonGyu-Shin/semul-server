import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(addressInfo) {
    const address: Promise<Address> | null = await this.addressRepository.save(
      addressInfo,
    );

    if (!address) throw new Error('DB에 자료가 생성되지 않았습니다.');

    return address;
  }
}
