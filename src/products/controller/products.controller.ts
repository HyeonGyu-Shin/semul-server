import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';
import { Product } from '../product.entity';
import { ProductsService } from '../service/products.service';
import { UpdateProductDto } from './../dto/update-product.dto';

@Controller('products')
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

  @Patch('/:id')
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
