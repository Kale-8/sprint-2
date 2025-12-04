import { PartialType } from '@nestjs/swagger';
import { CreateApiKeyDto } from './create-api-key.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateApiKeyDto extends PartialType(CreateApiKeyDto) {
    @ApiProperty({ description: 'Activar o desactivar la API key', required: false })
    @IsOptional()
    @IsBoolean()
    activa?: boolean;
}
