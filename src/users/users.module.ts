import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from 'src/address/address.module';
import { AddressRepository } from 'src/address/repository/address.repository';
import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/users.entity';
import { UsersController } from './controller/users.controller';
import { UsersRepository } from './repository/users.repository';
import { UsersService } from './service/users.service';

@Module({
  imports: [AddressModule, TypeOrmModule.forFeature([User, Address])],
  providers: [UsersService, UsersRepository, AddressRepository],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
