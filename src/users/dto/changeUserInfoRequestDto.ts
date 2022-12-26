import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { AddressDto } from '../../address/dto/addressDto';

export class ChangeUserInfoRequestDto {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
