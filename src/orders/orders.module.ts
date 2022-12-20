import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from '../products/repository/products.repository';
import { Order } from '../entities/order.entity';
import { OrdersController } from './controller/orders.controller';
import { OrdersRepository } from './repository/orders.repository';
import { OrdersService } from './service/orders.service';
import { OrderProductsRepository } from '../order_products/repository/order_products.repository';
import { OrderProductsService } from '../order_products/service/order_products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [
    OrdersRepository,
    OrdersService,
    ProductsRepository,
    OrderProductsRepository,
    OrderProductsService,
  ],
})
export class OrdersModule {}
