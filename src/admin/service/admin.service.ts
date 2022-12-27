import { Injectable } from '@nestjs/common';
import { AddressRepository } from 'src/address/repository/address.repository';
import { LaundryDto } from 'src/laundries/dto/laundryDto';
import { LaundriesRepository } from 'src/laundries/repository/laundries.repository';
import { OrdersRepository } from 'src/orders/repository/orders.repository';
import { ProductsRepository } from 'src/products/repository/products.repository';
import { UsersRepository } from 'src/users/repository/users.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly laundriesRepository: LaundriesRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly addressRepository: AddressRepository,
    private readonly ordersRepository: OrdersRepository,
    private dataSource: DataSource,
  ) {}

  async findAllUsers() {
    return await this.usersRepository.findAllUsers();
  }

  async findAllPartners() {
    return await this.laundriesRepository.findAllLaundries();
  }

  async findAllOrders(email: string) {
    const { id } = await this.usersRepository.findOneByEmail(email);
    console.log(id);
    return await this.ordersRepository.find({
      where: {
        user: { id: id },
      },
    });
  }

  async updatePartnerInfo(laundryId: string, laundryDto: LaundryDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const { manager } = queryRunner;

    try {
      const foundLaundry = await this.laundriesRepository.findOne(laundryId);

      const newAddress = laundryDto.address.toAddressEntity();
      newAddress.id = foundLaundry.address.id;

      const newLaundry = laundryDto.toLaundryEntity();
      newLaundry.id = foundLaundry.id;

      await this.addressRepository.updateOneInTransaction(manager, newAddress);

      await this.laundriesRepository.updateOneByEm(manager, newLaundry);

      queryRunner.commitTransaction();
      return '성공!';
    } catch (err) {
      queryRunner.rollbackTransaction();
      return err;
    }
  }

  async findAllProducts() {
    return await this.productsRepository.findAllProducts();
  }

  async deleteUser(userId: string) {
    await this.usersRepository.deleteOne(userId);
    return '유저가 삭제되었습니다!';
  }

  async deleteOrder(orderId: string) {
    await this.ordersRepository.softDelete(orderId);
    return '주문이 삭제되었습니다.';
  }

  async deleteProduct(productId: string) {
    await this.productsRepository.delete(productId);
    return '상품이 삭제되었습니다.';
  }
}
