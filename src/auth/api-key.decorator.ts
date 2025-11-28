// Este es un decorador para poder marcar los endpoints que requieren una API Key para acceder.
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';

export function ApiKeyAuth() {
  //Decorador personalizado para usar el guard de API Key
  return applyDecorators(UseGuards(ApiKeyGuard)); //Retorna el uso del guard ApiKeyGuard
}
