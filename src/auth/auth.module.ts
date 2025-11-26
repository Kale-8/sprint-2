import { Module } from '@nestjs/common';
import { AuthService } from './auth.service'; //Sirve para autenticar al usuario y generar los tokens JWT
import { PassportModule } from '@nestjs/passport'; //Sirve para manejar la autenticacion
import { AuthController } from './auth.controller'; //Controlador para el login y obtener los tokens JWT
import { JwtModule } from '@nestjs/jwt'; //Modulo para manejar los tokens JWT
import { JwtStrategy } from './jwt.strategy'; //Estrategia para validar los tokens JWT
import { TypeOrmModule } from '@nestjs/typeorm'; //Modulo para manejar la conexion a la base de datos
import { Usuario } from '../usuario/usuario.entity'; //Entidad Usuario para acceder a la tabla usuarios en la base de datos
import { GoogleStrategy } from './google.strategy'; //Estrategia para autenticacion con Google OAuth2

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' }),
    PassportModule,
    JwtModule.register({}), // puedes omitir config aquí si usas ConfigService
    TypeOrmModule.forFeature([Usuario]),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

//FLUJO PARA AUTENTICACION CON JWT:
//1. El usuario envia sus credenciales (email y password) al endpoint /auth/login del AuthController.
//2. El AuthController recibe los datos y llama al AuthService para validar las credenciales del usuario si son correctos.
//3. El AuthService busca el usuario en la base de datos por medio del email y compara la contraseña hasheada. 
// Si todo es correcto genera los tokens JWT (access y refresh) con la informacion del usuario (payload) y los retorna al AuthController.
//4. El AuthController recibe los tokens y los envia de vuelta al cliente (frontend) con el id, email y role del usuario.
//Esta info está codificada dentro del token, como si fuera un pase digital.
//5. El usuario accede a rutas protegidas enviando el token JWT en el encabezado Authorization como Bearer token.
//6. NestJs intercepta la peticion con un guards y utiliza la JwtStrategy para validar el token.
//7. JwtStrategy toma el token del header, lo verifica, extrae el payload y lo devuelve como req.user para que las rutas protegidas puedan usar esa info.
//8. Si el token es valido, el usuario puede acceder a las rutas protegidas segun su rol. Si no es valido, se rechaza la peticion con un error 401 Unauthorized.
