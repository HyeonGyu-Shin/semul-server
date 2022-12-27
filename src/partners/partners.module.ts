import { Module } from '@nestjs/common';
import { AddressModule } from 'src/address/address.module';
import { laundriesModule } from 'src/laundries/laundries.module';
import { LaundriesService } from 'src/laundries/service/laundries.service';
import { PartnersController } from './controller/partners.controller';

@Module({
  imports: [laundriesModule, AddressModule],
  providers: [LaundriesService],
  controllers: [PartnersController],
})
export class PartnersModule {}
