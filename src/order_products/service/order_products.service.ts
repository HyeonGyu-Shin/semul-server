import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../../entities/order.entity';
import { ProductsRepository } from '../../products/repository/products.repository';
import { OrderProductsRepository } from '../repository/order_products.repository';
import { CreateOrderDto } from './../../orders/dto/create-order.dto';

@Injectable()
export class OrderProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private orderProductsRepository: OrderProductsRepository,
  ) {}

  async create(order: Order & CreateOrderDto) {
    order.products.forEach(async (product) => {
      const { name, price } = await this.productsRepository.findOneBy({
        id: product['id'],
      });

      await this.orderProductsRepository.save({
        productName: name,
        price: price,
        qty: product['qty'],
        order: order,
      });
    });
  }
}
