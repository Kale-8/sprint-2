import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  nombre: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  rol?: string;
}
