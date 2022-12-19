import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from 'class-validator';
import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/users.entity';

export class SignUpRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  bizType: string;

  @IsObject()
  @IsNotEmptyObject()
  address: {
    roadAddr: 'string';
    detailAddr: 'string';
    jibun: 'string';
  };

  toUserEntity() {
    return User.from(
      this.email,
      this.password,
      this.name,
      this.phoneNumber,
      (this.bizType = 'user'),
    );
  }

  toAddressEntity() {
    return Address.from(
      this.address.roadAddr,
      this.address.detailAddr,
      this.address.jibun,
    );
  }
}
