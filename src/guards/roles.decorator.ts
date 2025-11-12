import { SetMetadata } from '@nestjs/common'; //Metadata para roles de usuario osea notas invisibles.


//Voy a guardar esta información bajo la etiqueta 'roles' de dichos roles en un array que seran admin y user de tipo string.
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);




//Tú marcas una ruta con @Roles('admin').
//NestJS guarda ese dato como metadato.
//Cuando alguien accede a esa ruta:
//El RolesGuard se ejecuta primero.
//Lee los roles permitidos desde los metadatos.
//Lee el rol del usuario desde req.user.role.
//Si el rol coincide → acceso permitido.
//Si no → error 403 Forbidden.
