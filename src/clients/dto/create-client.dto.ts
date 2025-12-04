import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'Nombre completo del cliente',
    example: 'María García',
    minLength: 2,
    maxLength: 150,
  })
  @IsString()
  @Length(2, 150)
  nombre!: string;

  @ApiProperty({
    description: 'Email del cliente',
    example: 'maria.garcia@example.com',
    minLength: 5,
    maxLength: 150,
  })
  @IsEmail()
  @Length(5, 150)
  email!: string;

  @ApiProperty({
    description: 'Teléfono del cliente (opcional)',
    example: '3001234567',
    required: false,
    maxLength: 30,
  })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  telefono?: string;
}
