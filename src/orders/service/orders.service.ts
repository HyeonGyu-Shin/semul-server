import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../../entities/order.entity';
import { OrdersRepository } from '../repository/orders.repository';
import { CreateOrderDto } from './../dto/create-order.dto';
import { OrderProductsService } from './../../order_products/service/order_products.service';
import { User } from '../../entities/users.entity';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderProductsService: OrderProductsService,
  ) {}

  async create(orderData: CreateOrderDto, user: User) {
    const order = await this.ordersRepository.save({ ...orderData, user });

    await this.orderProductsService.create(order);

    return order;
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id });

    if (!order) throw new NotFoundException(`Order with ID ${id} not found.`);

    return order;
  }

  findByStatus(status: string): Promise<Order[]> {
    return this.ordersRepository.findByStatus(status);
  }
}
