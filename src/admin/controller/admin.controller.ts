import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { LaundryDto } from 'src/laundries/dto/laundryDto';
import { AdminService } from '../service/admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getAllUsers() {
    return this.adminService.findAllUsers();
  }

  @Get('partners')
  async getAllPartners() {
    return this.adminService.findAllPartners();
  }

  @Put('partners/:id')
  async changePartnerInfo(
    @Param('id') laundryId: string,
    @Body() laundryDto: LaundryDto,
  ) {
    return this.adminService.updatePartnerInfo(laundryId, laundryDto);
  }

  @Delete('users')
  async deleteUser(@Body('userId') userId: string) {
    return this.adminService.deleteUser(userId);
  }

  @Get('orders')
  async getAllOrders(@Query('email') email: string) {
    return this.adminService.findAllOrders(email);
  }

  @Delete('orders')
  async deleteOrder(@Body('orderId') orderId: string) {
    return this.adminService.deleteOrder(orderId);
  }

  @Get('products')
  async getAllProducts() {
    return this.adminService.findAllProducts();
  }

  @Delete('products')
  async deleteProduct(@Body('productId') productId: string) {
    return this.adminService.deleteProduct(productId);
  }
}
