import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrdersService } from '../service/orders.service';
import { FilterOrderDto } from '../dto/filter-order.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { User } from '../../users/users.entity';
import { Order } from '../order.entity';
import { UpdateOrderDto } from '../dto/update-order.dto';

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

  @Patch('/:id')
  @HttpCode(204)
  async patchOne(
    @Param('id') orderId: string,
    @Body() order: UpdateOrderDto,
  ): Promise<void> {
    await this.ordersService.updateOne(orderId, order);
  }
}
