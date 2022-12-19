import { Body, Controller, Post } from '@nestjs/common';
import { SignUpRequestDto } from '../dto/signUpRequestDto';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body() signUpRequestDto: SignUpRequestDto) {
    return this.usersService.createUser(signUpRequestDto);
  }
}
