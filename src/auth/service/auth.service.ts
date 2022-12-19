import { BadRequestException, Injectable } from '@nestjs/common';
import { LogInRequestDto } from 'src/users/dto/logInRequestDto';
import { UsersRepository } from 'src/users/repository/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LogInRequestDto) {
    const { email, password } = data;

    const user = await this.usersRepository.findUserByEmailForLogIn(email);

    await this.comparePassword(password, user.password);

    const payload = { userEmail: user.email, userId: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async comparePassword(passowrdFromClient, passwordFromDb) {
    const isMatch = await bcrypt.compare(passowrdFromClient, passwordFromDb);

    if (!isMatch)
      throw new BadRequestException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );

    return;
  }
}
