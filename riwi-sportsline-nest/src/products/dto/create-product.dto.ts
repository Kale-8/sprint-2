import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Código único del producto (SKU)',
    example: 'SKU-001',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  @Length(1, 50)
  codigo!: string;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Balón de Fútbol',
    minLength: 2,
    maxLength: 150,
  })
  @IsString()
  @Length(2, 150)
  nombre!: string;

  @ApiProperty({
    description: 'Precio del producto (formato decimal)',
    example: '100000.00',
    type: String,
  })
  @IsNumberString()
  precio!: string;

  @ApiProperty({
    description: 'Cantidad en stock',
    example: 50,
    minimum: 0,
    type: Number,
  })
  @IsInt()
  @Min(0)
  stock!: number;
}
