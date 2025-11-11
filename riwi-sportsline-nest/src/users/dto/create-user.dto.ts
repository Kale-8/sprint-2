import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 100)
  nombre!: string;

  @IsEmail()
  @Length(5, 150)
  email!: string;

  @IsString()
  @Length(10, 255)
  passwordHash!: string;

  @IsEnum(['admin', 'vendedor'])
  rol!: 'admin' | 'vendedor';
}


