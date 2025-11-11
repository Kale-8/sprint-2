import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(1, 50)
  codigo!: string;

  @IsString()
  @Length(2, 150)
  nombre!: string;

  // precio se maneja como string decimal (10,2)
  @IsNumberString()
  precio!: string;

  @IsInt()
  @Min(0)
  stock!: number;
}


