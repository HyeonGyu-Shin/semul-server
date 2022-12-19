import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../../entities/order.entity';
import { OrdersRepository } from '../repository/orders.repository';
import { CreateOrderDto } from './../dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async create({ status, notice, pickUpDateTime, productIds }: CreateOrderDto) {
    await this.ordersRepository.save({
      status,
      notice,
      pickUpDateTime,
      products: productIds,
    });
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }

    return order;
  }

  async findByStatus(status: string): Promise<Order[]> {
    return await this.ordersRepository.findByStatus(status);
  }
}
