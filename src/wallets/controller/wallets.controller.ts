import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtGuard';
import { AuthService } from 'src/auth/service/auth.service';
import { WalletsService } from '../service/wallets.service';

@Controller('wallets')
@UseGuards(JwtAuthGuard)
export class WalletsController {
  constructor(
    private readonly walletService: WalletsService,
    private readonly authService: AuthService,
  ) {}

  @Post('')
  async createWallet(@Param('id') userId: string, @Req() req) {
    return this.walletService.createWallet(req.user);
  }

  @Get(':id')
  async showMoney(@Param('id') userId: string, @Req() req) {
    this.authService.compareUserId(userId, req.user.id);
    return this.walletService.showMoney(req.user);
  }

  @Patch('/charge/:id')
  async chargeMoney(
    @Body('plusMoney', ParseIntPipe) plusMoney: number,
    @Param('id') userId: string,
    @Req() req,
  ) {
    this.authService.compareUserId(userId, req.user.id);
    return this.walletService.chargeMoney(req.user, plusMoney);
  }

  @Patch(':id')
  async reduceMoney(
    @Body('minusMoney', ParseIntPipe) minusMoney: number,
    @Param('id') userId: string,
    @Req() req,
  ) {
    this.authService.compareUserId(userId, req.user.id);
    return this.walletService.reduceMoney(req.user, minusMoney);
  }
}
