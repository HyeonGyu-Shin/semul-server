import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OrderProduct } from '../../entities/order_product.entity';

@Injectable()
export class OrderProductsRepository extends Repository<OrderProduct> {
  constructor(private dataSource: DataSource) {
    super(OrderProduct, dataSource.createEntityManager());
  }
}
