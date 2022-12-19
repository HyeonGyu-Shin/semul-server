import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';
import { ProductsService } from '../service/products.service';
import { Product } from '../../entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() productData: CreateProductDto) {
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
  async getOne(@Param('id') orderId: string): Promise<Product> {
    return await this.productsService.findOne(orderId);
  }
}
