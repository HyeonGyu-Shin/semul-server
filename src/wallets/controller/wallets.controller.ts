import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthService } from 'src/auth/service/auth.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/entities/users.entity';
import { WalletsService } from '../service/wallets.service';

@Controller('wallets')
@UseGuards(JwtAuthGuard)
export class WalletsController {
  constructor(
    private readonly walletService: WalletsService,
    private readonly authService: AuthService,
  ) {}

  @Post('')
  async createWallet(
    @Param('id') userId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.walletService.createWallet(currentUser);
  }

  @Get(':id')
  async showMoney(
    @Param('id') userId: string,
    @CurrentUser() currentUser: User,
  ) {
    this.authService.compareUserId(userId, currentUser);
    return this.walletService.showMoney(currentUser);
  }

  @Patch('/charge/:id')
  async chargeMoney(
    @Body('plusMoney', ParseIntPipe) plusMoney: number,
    @Param('id') userId: string,
    @CurrentUser() currentUser: User,
  ) {
    this.authService.compareUserId(userId, currentUser);
    return this.walletService.chargeMoney(currentUser, plusMoney);
  }

  @Patch(':id')
  async reduceMoney(
    @Body('minusMoney', ParseIntPipe) minusMoney: number,
    @Param('id') userId: string,
    @CurrentUser() currentUser: User,
  ) {
    this.authService.compareUserId(userId, currentUser);
    return this.walletService.reduceMoney(currentUser, minusMoney);
  }
}
