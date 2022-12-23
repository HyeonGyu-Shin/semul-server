import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
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

  @Get('orders')
  async getAllOrders() {
    return 'get All orders';
  }

  @Get('products')
  async getAllProducts() {
    return this.adminService.findAllProducts();
  }
}
