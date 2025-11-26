import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'Nuevo estado del pedido',
    enum: ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    example: 'SHIPPED',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsEnum(['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
  status?: string;

  @ApiProperty({
    description: 'Método de pago actualizado',
    enum: ['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'OTHER'],
    example: 'CREDIT_CARD',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsEnum(['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'OTHER'])
  paymentMethod?: string;

  @ApiProperty({
    description: 'Notas adicionales sobre el pedido',
    example: 'El cliente solicitó factura',
    required: false
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
