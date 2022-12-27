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
import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';
import { Product } from '../product.entity';
import { ProductsService } from '../service/products.service';
import { UpdateProductDto } from './../dto/update-product.dto';

@Controller('admin/products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() productData: CreateProductDto[]) {
    return await this.productsService.create(productData);
  }

  @Get()
  async getAll(@Query() dto: FilterProductDto): Promise<Product[]> {
    if (dto.category) {
      return await this.productsService.findByCategory(dto.category);
    }

    return await this.productsService.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id') productId: string): Promise<Product> {
    return await this.productsService.findOne(productId);
  }

  @Put('/:id')
  @HttpCode(204)
  async patchOne(
    @Param('id') productId: string,
    @Body() product: UpdateProductDto,
  ): Promise<void> {
    await this.productsService.updateOne(productId, product);
  }

  @Delete('/:id')
  async deleteOne(@Param('id') productId: string) {
    await this.productsService.deleteOne(productId);
  }
}
