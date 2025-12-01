import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
    @ApiProperty({
        description: 'Nombre completo del cliente',
        example: 'Juan Pérez',
        required: true
    })
    //hola
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Documento de identidad (cédula o NIT)',
        example: '1234567890',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    document: string;

    @ApiProperty({
        description: 'Correo electrónico del cliente',
        example: 'juan.perez@ejemplo.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Número de teléfono del cliente',
        example: '+57 300 123 4567',
        required: false
    })
    @IsString()
    @IsOptional()
    phone?: string;
}
