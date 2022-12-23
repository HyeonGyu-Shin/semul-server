import {
  IsArray,
  IsDateString,
  IsString,
  IsOptional,
  IsObject,
} from 'class-validator';
import { Status } from '../../common/enums/status.enum';

export class CreateOrderDto {
  @IsString()
  readonly status: Status;

  @IsString()
  readonly pickUpMethod: string;

  @IsDateString()
  readonly pickUpDateTime: Date;

  @IsObject()
  readonly address: { roadAddr: string; detailAddr: string; jibun: string };

  @IsDateString()
  @IsOptional()
  readonly wishLaundryDateTime: Date;

  @IsString()
  @IsOptional()
  readonly notice: string;

  @IsArray()
  readonly products: string[];

  @IsString()
  readonly laundryId: string;

  @IsArray()
  @IsOptional()
  readonly images: string[];
}
