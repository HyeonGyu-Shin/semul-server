import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { ProductsRepository } from '../products/repository/products.repository';
import { OrdersRepository } from './repository/orders.repository';
import { OrderProductsRepository } from '../order_products/repository/order_products.repository';
import { OrdersService } from './service/orders.service';
import { OrderProductsService } from '../order_products/service/order_products.service';
import { OrdersController } from './controller/orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [
    ProductsRepository,
    OrdersRepository,
    OrderProductsRepository,
    OrdersService,
    OrderProductsService,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
