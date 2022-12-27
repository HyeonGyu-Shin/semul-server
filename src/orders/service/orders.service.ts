import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OrdersRepository } from '../repository/orders.repository';
import { ProductsRepository } from './../../products/repository/products.repository';
import { OrderProductsRepository } from './../../order_products/repository/order_products.repository';
import { CreateOrderDto } from './../dto/create-order.dto';
import { User } from '../../users/users.entity';
import { OrderProduct } from '../../order_products/order_product.entity';
import { Order } from '../order.entity';
import { LaundriesRepository } from './../../laundries/repository/laundries.repository';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    private ordersRepository: OrdersRepository,
    private productsRepository: ProductsRepository,
    private orderProductsRepository: OrderProductsRepository,
    private laundriesRepository: LaundriesRepository,
  ) {}

  async create(orderData: CreateOrderDto, user: User) {
    const queryRunner = this.dataSource.createQueryRunner();
    const { manager } = queryRunner;

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const laundry = await this.laundriesRepository.findOne(
        orderData.laundryId,
      );
      const count = await this.ordersRepository.count();
      const { identifiers } = await this.ordersRepository.saveByTransaction(
        manager,
        orderData,
        user,
        laundry,
        count,
      );
      const orderId = identifiers[0]['id'];

      for (const product of orderData.products) {
        const { name, price } = await this.productsRepository.findOneBy({
          id: product['id'],
        });

        const orderProduct = new OrderProduct();

        orderProduct.productName = name;
        orderProduct.price = price;
        orderProduct.qty = product['qty'];
        orderProduct.orderId = orderId;
        orderData.images
          ? (orderProduct.images = orderData.images)
          : (orderProduct.images = ['default.jpg']);

        await this.orderProductsRepository.saveByTransaction(
          manager,
          orderProduct,
        );
      }

      await queryRunner.commitTransaction();

      return { id: orderId };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new NotFoundException();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(currentUser: User): Promise<Order[]> {
    const ordersWithProducts = [];
    const orders = await this.ordersRepository.find({
      where: {
        user: { id: currentUser.id },
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

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id });

    if (!order) throw new NotFoundException(`Order with ID ${id} not found.`);

    const products = await this.orderProductsRepository.findBy({ orderId: id });
    const orderWithProducts = { ...order, orderProducts: products };

    return orderWithProducts;
  }

  findByStatus(status: string, currentUser: User): Promise<Order[]> {
    return this.ordersRepository.findByStatus(status, currentUser.id);
  }

  async updateOne(id: string, order: UpdateOrderDto) {
    const foundOrder = await this.ordersRepository.findOneBy({
      id,
    });

    if (!foundOrder)
      throw new NotFoundException(`Order with ID ${id} not found.`);

    await this.ordersRepository.update(id, order);
  }
}
