import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @Length(2, 150)
  nombre!: string;

  @IsEmail()
  @Length(5, 150)
  email!: string;

  @IsOptional()
  @IsString()
  @Length(0, 30)
  telefono?: string;
}


