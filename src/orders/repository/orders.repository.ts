import { Injectable } from '@nestjs/common';
import { Order } from '../../entities/order.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrdersRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async findByStatus(status: string): Promise<Order[]> {
    const result = await this.createQueryBuilder('order')
      .where('order.status = :status', { status: status })
      .getMany();
    return result;
  }
}
