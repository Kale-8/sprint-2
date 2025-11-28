import { IsString, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductoDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  nombre: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsNumber()
  @Min(0)
  @Max(1000)
  stock: number;
}
