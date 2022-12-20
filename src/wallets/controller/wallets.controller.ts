import {
  Body,
  Controller,
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

  @Patch('/charge/:id')
  async chargeMoney(
    @Body('money', ParseIntPipe) money: number,
    @Param('id') userId: string,
    @Req() req,
  ) {
    this.authService.compareUserId(userId, req.user.id);
    return this.walletService.chargeMoney(req.user, money);
  }
}
