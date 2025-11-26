import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({
        description: 'Nombre del rol',
        example: 'admin',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Descripción del rol',
        example: 'Administrador del sistema con acceso completo',
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string;
}
