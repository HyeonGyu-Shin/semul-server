import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from './repository/products.repository';
import { ProductsService } from './service/products.service';
import { ProductsController } from './controller/products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsRepository, ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
