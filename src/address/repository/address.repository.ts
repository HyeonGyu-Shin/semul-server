import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(address: Address) {
    return await this.addressRepository.save(address);
  }

  async createByTransaction(manager: EntityManager, address: Address) {
    return await manager.save(address);
  }
}
