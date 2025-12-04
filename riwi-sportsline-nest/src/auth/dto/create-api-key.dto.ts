import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApiKeyDto {
  @ApiProperty({
    description: 'Nombre descriptivo de la API key',
    example: 'Sistema Externo A',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nombre!: string;

  @ApiProperty({
    description: 'Lista de scopes/permisos',
    example: ['products:read', 'orders:read'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  scopes!: string[];

  @ApiProperty({
    description: 'Fecha de expiración (opcional)',
    required: false,
    example: '2025-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  expiraEn?: string;
}
