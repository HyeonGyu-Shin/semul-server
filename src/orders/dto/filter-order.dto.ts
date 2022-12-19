import { IsOptional, IsString } from 'class-validator';

export class FilterOrderDto {
  @IsOptional()
  @IsString()
  readonly status: string;
}
