import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { LaundryDto } from 'src/laundries/dto/laundryDto';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { FilterProductDto } from 'src/products/dto/filter-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { Product } from 'src/products/product.entity';
import { ProductsService } from 'src/products/service/products.service';
import { AdminService } from '../service/admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly productsService: ProductsService,
  ) {}

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

  @Delete('users/:id')
  async deleteUser(@Param('id') userId: string) {
    return this.adminService.deleteUser(userId);
  }

  @Post('products')
  async create(@Body() productData: CreateProductDto[]) {
    return await this.productsService.create(productData);
  }

  @Get('products')
  async getAll(@Query() dto: FilterProductDto): Promise<Product[]> {
    if (dto.category) {
      return await this.productsService.findByCategory(dto.category);
    }

    return await this.productsService.findAll();
  }

  @Get('products/:id')
  async getOne(@Param('id') productId: string): Promise<Product> {
    return await this.productsService.findOne(productId);
  }

  @Put('products/:id')
  @HttpCode(204)
  async patchOne(
    @Param('id') productId: string,
    @Body() product: UpdateProductDto,
  ): Promise<void> {
    await this.productsService.updateOne(productId, product);
  }

  @Delete('products/:id')
  async deleteOne(@Param('id') productId: string) {
    await this.productsService.deleteOne(productId);
  }

  @Get('orders')
  async getAllOrders(@Query('email') email: string) {
    return this.adminService.findAllOrders(email);
  }

  @Put('orders/:id')
  async changeOrderStatus(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.adminService.updateOrderStatus(orderId, updateOrderDto);
  }

  @Delete('orders/:id')
  async deleteOrder(@Param('id') orderId: string) {
    return this.adminService.deleteOrder(orderId);
  }
}
