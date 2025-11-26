import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'ID del producto',
    example: '60d0fe4f5311236168a109cb',
    required: true
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'Cantidad del producto',
    example: 2,
    minimum: 1,
    required: true
  })
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  quantity: number;

  @ApiProperty({
    description: 'Precio unitario al momento de la compra',
    example: 29.99,
    required: true
  })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0.01, { message: 'El precio debe ser mayor a 0' })
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID del cliente que realiza el pedido',
    example: '60d0fe4f5311236168a109ca',
    required: true
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({
    description: 'ID del usuario (vendedor) que gestiona el pedido',
    example: '60d0fe4f5311236168a109cc',
    required: false
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiProperty({
    description: 'Método de pago',
    enum: ['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'OTHER'],
    example: 'CREDIT_CARD',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'OTHER'])
  paymentMethod: string;

  @ApiProperty({
    description: 'Notas adicionales del pedido',
    example: 'Entregar en recepción',
    required: false
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'Items del pedido',
    type: [CreateOrderItemDto],
    required: true
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
