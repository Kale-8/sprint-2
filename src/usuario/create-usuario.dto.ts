//Este archivo define el DTO para crear un nuevo usuario
import { IsString, IsEmail, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUsuarioDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

   @IsString()
   role?: string;
}
