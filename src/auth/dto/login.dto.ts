import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'admin@sportsline.com',
    type: String,
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'admin123',
    minLength: 6,
    maxLength: 255,
    type: String,
  })
  @IsString()
  @Length(6, 255)
  password!: string;
}
