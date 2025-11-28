//Scoopes define los scopes necesarios para acceder a un endpoint, osea dar permisos especificos a cada endpoint.
import { SetMetadata } from '@nestjs/common';

//Scopes(...): decorador que usas en tus endpoints para decir qué permisos necesitan.
export const SCOPES_KEY = 'scopes'; //Clave para identificar los scopes de los endpoints.
export const Scopes = (...scopes: string[]) => SetMetadata(SCOPES_KEY, scopes); //Decorador para asignar scopes a los endpoints.

//NOTA: Un scope es un permiso especifico que define que acciones puede realizar como un GET o un POSTen ciertos recursos.
