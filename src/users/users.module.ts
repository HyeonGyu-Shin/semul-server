import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from 'src/address/address.module';
import { AddressRepository } from 'src/address/repository/address.repository';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/service/auth.service';
import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/users.entity';
import { UsersController } from './controller/users.controller';
import { UsersRepository } from './repository/users.repository';
import { UsersService } from './service/users.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Address]),
    forwardRef(() => AuthModule),
    AddressModule,
  ],
  providers: [UsersService, UsersRepository, AddressRepository, AuthService],
  controllers: [UsersController],
  exports: [UsersRepository],
})
export class UsersModule {}
