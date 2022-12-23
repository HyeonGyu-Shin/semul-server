import { Module } from '@nestjs/common';
import { laundriesModule } from 'src/laundries/laundries.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { AdminController } from './controller/admin.controller';
import { AdminService } from './service/admin.service';

@Module({
  imports: [UsersModule, laundriesModule, ProductsModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
