import { IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateClienteDto {
  @IsString()
  @Length(2, 50)
  @Transform(({ value }) => value.trim())
  nombre: string;

  @IsString()
  @Length(5, 100)
  @Transform(({ value }) => value.trim())
  direccion: string;
}
