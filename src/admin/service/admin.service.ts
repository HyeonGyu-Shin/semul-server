import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepository } from 'src/address/repository/address.repository';
import { Status } from 'src/common/enums/status.enum';
import { LaundryDto } from 'src/laundries/dto/laundryDto';
import { LaundriesRepository } from 'src/laundries/repository/laundries.repository';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';
import { OrdersRepository } from 'src/orders/repository/orders.repository';
import { OrderProductsRepository } from 'src/order_products/repository/order_products.repository';
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
    private readonly orderProductsRepository: OrderProductsRepository,
    private dataSource: DataSource,
  ) {}

  async findAllUsers() {
    return await this.usersRepository.findAllUsers();
  }

  async findAllPartners() {
    return await this.laundriesRepository.findAllLaundries();
  }

  async findAllOrders(email: string) {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');

    const ordersWithProducts = [];

    if (!email) {
      const orders = await this.ordersRepository.find();

      for (const order of orders) {
        const products = await this.orderProductsRepository.findBy({
          orderId: order.id,
        });
        ordersWithProducts.push({ ...order, orderProducts: products });
      }

      return ordersWithProducts;
    }

    const orders = await this.ordersRepository.find({
      where: {
        user: { id: user.id },
      },
    });

    for (const order of orders) {
      const products = await this.orderProductsRepository.findBy({
        orderId: order.id,
      });
      ordersWithProducts.push({ ...order, orderProducts: products });
    }

    return ordersWithProducts;
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

  async updateOrderStatus(orderId: string, orderInfo: UpdateOrderDto) {
    if (
      !(await this.ordersRepository.findOne({
        where: {
          id: orderId,
        },
      }))
    )
      throw new NotFoundException('주문을 찾을 수 없습니다.');

    if (orderInfo.status === Status.Complete)
      orderInfo = { ...orderInfo, completedDateTime: new Date() };
    else if (orderInfo.status === Status.Cancel)
      orderInfo = { ...orderInfo, cancelledDateTime: new Date() };

    await this.ordersRepository.update(orderId, orderInfo);

    return '성공적으로 변경되었습니다.';
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
