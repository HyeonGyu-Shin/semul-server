import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthService } from 'src/auth/service/auth.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { LogInRequestDto } from '../dto/logInRequestDto';
import { SignUpRequestDto } from '../dto/signUpRequestDto';
import { UsersService } from '../service/users.service';
import { User } from '../users.entity';

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

  @Get()
  @UseGuards(JwtAuthGuard)
  async findOne(@CurrentUser() currentUser: User) {
    return this.usersService.findOneUser(currentUser);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteOne(@CurrentUser() currentUser: User) {
    return this.usersService.deleteUser(currentUser);
  }
}
