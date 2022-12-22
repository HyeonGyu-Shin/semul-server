import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthService } from 'src/auth/service/auth.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/entities/users.entity';
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
  async findOne(@Param('id') userId: string, @CurrentUser() currentUser: User) {
    this.authService.compareUserId(userId, currentUser);
    return currentUser;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteOne(
    @Param('id') userId: string,
    @CurrentUser() currentUser: User,
  ) {
    this.authService.compareUserId(userId, currentUser);
    return this.usersService.deleteUser(userId);
  }
}
