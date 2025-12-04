import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('api-keys')
@ApiBearerAuth()
@Controller('auth/api-keys')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva API key (solo admin)' })
  @ApiResponse({
    status: 201,
    description:
      'API key creada exitosamente. La key en texto plano solo se muestra una vez.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado. Solo administradores.',
  })
  create(@Body() dto: CreateApiKeyDto, @Req() req: any) {
    const userId = req.user?.userId;
    return this.apiKeysService.create(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las API keys' })
  @ApiResponse({
    status: 200,
    description: 'Lista de API keys (sin mostrar keys completas)',
  })
  findAll() {
    return this.apiKeysService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalles de una API key' })
  @ApiResponse({ status: 200, description: 'Detalles de la API key' })
  @ApiResponse({ status: 404, description: 'API key no encontrada' })
  findOne(@Param('id') id: string) {
    return this.apiKeysService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar API key' })
  @ApiResponse({ status: 200, description: 'API key actualizada' })
  update(@Param('id') id: string, @Body() dto: UpdateApiKeyDto) {
    return this.apiKeysService.update(id, dto);
  }

  @Post(':id/revoke')
  @ApiOperation({ summary: 'Revocar API key (desactivar)' })
  @ApiResponse({ status: 200, description: 'API key revocada' })
  revoke(@Param('id') id: string) {
    return this.apiKeysService.revoke(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar API key permanentemente' })
  @ApiResponse({ status: 200, description: 'API key eliminada' })
  remove(@Param('id') id: string) {
    return this.apiKeysService.remove(id);
  }
}
