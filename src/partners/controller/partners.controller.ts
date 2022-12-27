import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { LaundriesService } from 'src/laundries/service/laundries.service';
import { User } from 'src/users/users.entity';

@Controller('partners')
export class PartnersController {
  constructor(private readonly laundriesService: LaundriesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getLaundry(@CurrentUser() user: User) {
    return await this.laundriesService.findLaundry(user);
  }
}
