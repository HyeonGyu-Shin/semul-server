import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Order } from '../../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrdersService } from '../service/orders.service';
import { FilterOrderDto } from '../dto/filter-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() orderData: CreateOrderDto) {
    return await this.ordersService.create(orderData);
  }

  @Get()
  async getAll(@Query() dto: FilterOrderDto): Promise<Order[]> {
    if (dto.status) {
      return await this.ordersService.findByStatus(dto.status);
    }

    return await this.ordersService.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id') orderId: string): Promise<Order> {
    return await this.ordersService.findOne(orderId);
  }
}
