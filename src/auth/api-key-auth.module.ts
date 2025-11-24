//Agrupamos el guard de API Key en un decorador personalizado para facilitar su uso en los controladores.

import { Module } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';

@Module({
  providers: [ApiKeyGuard],
  exports: [ApiKeyGuard],
})
export class ApiKeyAuthModule {}



//FLUJO
//El cliente hace POST /cliente con header: x-api-key: supersecreta123
//El ApiKeyGuard valida la clave.
//Si coincide → pasa al controlador.
//Si no → lanza 401 Unauthorized.

//Se utilizara la clave de API Key para los endpoints de clientes que crean o modifican datos sensibles.