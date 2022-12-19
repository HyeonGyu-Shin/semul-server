import { Body, Controller, Post } from '@nestjs/common';
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
  async logIn(@Body() logInRequestDto: LogInRequestDto) {
    return this.authService.jwtLogIn(logInRequestDto);
  }
}
