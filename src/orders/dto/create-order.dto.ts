import { IsArray, IsDateString, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  readonly status: string;

  @IsString()
  readonly notice: string;

  @IsDateString()
  readonly pickUpDateTime: Date;

  @IsArray()
  readonly productIds: string[];
}
