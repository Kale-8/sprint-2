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
