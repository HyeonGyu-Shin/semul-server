import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrdersService } from '../service/orders.service';
import { FilterOrderDto } from '../dto/filter-order.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { User } from 'src/users/users.entity';
import { Order } from '../order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() orderData: CreateOrderDto,
    @CurrentUser() currentUser: User,
  ) {
    return await this.ordersService.create(orderData, currentUser);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@Query() dto: FilterOrderDto): Promise<Order[]> {
    if (dto.status) {
      return await this.ordersService.findByStatus(dto.status);
    }

    return await this.ordersService.findAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') orderId: string): Promise<Order> {
    return await this.ordersService.findOne(orderId);
  }
}
