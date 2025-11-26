import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApiKeyDto {
  @ApiProperty({
    description: 'Propietario de la API key',
    example: 'Sistema de Inventario',
    required: true
  })
  @IsString()
  owner: string;

  @ApiProperty({
    description: 'Permisos o alcances de la API key',
    example: ['read:products', 'write:orders'],
    required: false,
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scopes?: string[];
}
