import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiKeyScopesGuard } from 'src/common/guards/api-key-scopes.guard';
import { ApiKeyScopes } from 'src/modules/auth/dto/api-key-scopes.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Api Externa')
@Controller('external')
export class ExternalController {
  @UseGuards(ApiKeyGuard, ApiKeyScopesGuard)
  @ApiKeyScopes('read:products')
  @Get('products')
  getProducts() {
    return { message: 'Acceso permitido con API key y scope correcto' };
  }
}
