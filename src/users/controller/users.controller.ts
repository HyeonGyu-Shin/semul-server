import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtGuard';
import { AuthService } from 'src/auth/service/auth.service';
import { LogInRequestDto } from '../dto/logInRequestDto';
import { SignUpRequestDto } from '../dto/signUpRequestDto';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() signUpRequestDto: SignUpRequestDto) {
    return this.usersService.createUser(signUpRequestDto);
  }

  @Post('login')
  @HttpCode(200)
  async logIn(@Body() logInRequestDto: LogInRequestDto) {
    return this.authService.jwtLogIn(logInRequestDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') userId, @Req() req) {
    this.authService.compareUserId(userId, req.user.id);
    return req.user;
  }
}
