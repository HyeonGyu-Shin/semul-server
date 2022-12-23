import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductsRepository } from '../repository/products.repository';
import { Product } from '../product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from './../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async create(productData: CreateProductDto[]) {
    const product = await this.productsRepository.save(productData);

    return product;
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

  findByCategory(category: string): Promise<Product[]> {
    return this.productsRepository.findByCategory(category);
  }

  async updateOne(id: string, product: UpdateProductDto) {
    const foundProduct = await this.productsRepository.findOneBy({
      name: product.name,
    });

    if (foundProduct) {
      throw new BadRequestException(
        `name: '${product.name}' is already use in the products`,
      );
    }

    await this.productsRepository.update(id, product);
  }

  async deleteOne(id: string) {
    await this.productsRepository.softDelete(id);
  }
}
