import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../repository/products.repository';
import { Product } from '../../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async create(productData: CreateProductDto) {
    await this.productsRepository.save(productData);
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    const Product = await this.productsRepository.findOneBy({ id });

    if (!Product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    return Product;
  }

  async findByCategory(category: string): Promise<Product[]> {
    return await this.productsRepository.findByCategory(category);
  }
}
