import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @Length(2, 100)
  nombre!: string;

  @ApiProperty({
    description: 'Email del usuario (debe ser único)',
    example: 'juan.perez@example.com',
    minLength: 5,
    maxLength: 150,
  })
  @IsEmail()
  @Length(5, 150)
  email!: string;

  @ApiProperty({
    description: 'Contraseña del usuario (será hasheada)',
    example: 'password123',
    minLength: 10,
    maxLength: 255,
  })
  @IsString()
  @Length(10, 255)
  passwordHash!: string;

  @ApiProperty({
    description: 'Rol del usuario',
    example: 'vendedor',
    enum: ['admin', 'vendedor'],
  })
  @IsEnum(['admin', 'vendedor'])
  rol!: 'admin' | 'vendedor';
}
