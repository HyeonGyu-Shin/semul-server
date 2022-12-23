import { Injectable } from '@nestjs/common';
import { LaundriesRepository } from 'src/laundries/repository/laundries.repository';
import { ProductsRepository } from 'src/products/repository/products.repository';
import { UsersRepository } from 'src/users/repository/users.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly laundriesRepository: LaundriesRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async findAllUsers() {
    return await this.usersRepository.findAllUsers();
  }

  async findAllPartners() {
    return await this.laundriesRepository.findAllLaundries();
  }

  async findAllProducts() {
    return await this.productsRepository.findAllProducts();
  }
}
