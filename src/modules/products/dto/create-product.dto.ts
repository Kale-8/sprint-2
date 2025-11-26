import { IsString, IsNumber, IsNotEmpty, IsOptional, IsDecimal, Min, MaxLength, MinLength, IsAlphanumeric } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Camiseta de algodón',
    required: true,
    maxLength: 120
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Camiseta 100% algodón, disponible en varios colores',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 29.99,
    required: true,
    minimum: 0
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Cantidad en inventario',
    example: 100,
    required: false,
    default: 0,
    minimum: 0
  })
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  stock?: number = 0;

  @ApiProperty({
    description: 'Código SKU único del producto',
    example: 'TSHIRT-BLK-M',
    required: true,
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsAlphanumeric()
  sku: string;
}
