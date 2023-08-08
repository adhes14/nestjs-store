import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
} from 'class-validator';
import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Product name' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['name']),
) {}
