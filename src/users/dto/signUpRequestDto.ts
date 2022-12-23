import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from 'class-validator';
import { Address } from 'src/address/address.entity';
import { Role } from 'src/common/enums/role.enum';
import { User } from '../users.entity';

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
  bizType: Role;

  @IsObject()
  @IsNotEmptyObject()
  address: {
    roadAddr: 'string';
    detailAddr: 'string';
    jibun: 'string';
  };

  toUserEntity() {
    return User.createEntityInstance(
      this.email,
      this.password,
      this.name,
      this.phoneNumber,
      this.bizType,
    );
  }

  toAddressEntity() {
    return Address.createEntityInstance(
      this.address.roadAddr,
      this.address.detailAddr,
      this.address.jibun,
    );
  }
}
