import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminController {
  @Get('users')
  async getAllUsers() {
    return 'get All users';
  }

  @Get('partners')
  async getAllPartners() {
    return 'get All partners';
  }

  @Get('orders')
  async getAllOrders() {
    return 'get All orders';
  }

  @Get('products')
  async getAllProducts() {
    return 'get ALl products';
  }
}
