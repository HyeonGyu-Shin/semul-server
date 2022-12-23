import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from 'src/address/address.module';
import { AddressRepository } from 'src/address/repository/address.repository';
import { Laundry } from 'src/entities/laundry.entity';
import { LaundriesController } from './controller/laundries.controller';
import { LaundriesRepository } from './repository/laundries.repository';
import { LaundriesService } from './service/laundries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Laundry]), AddressModule],
  controllers: [LaundriesController],
  providers: [LaundriesService, LaundriesRepository],
})
export class laundriesModule {}
