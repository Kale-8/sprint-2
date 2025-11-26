//Aca implementamos la estrategia para autenticacion con Google

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';  //Aca importamos 

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') { //estrategia Passport usando la estrategia de Google, con el nombre 'google'. Ese nombre es el que usarás en AuthGuard('google').
  constructor() {
    super({    //Inicializamos la estrategia con las credenciales de Google
      clientID: process.env.GOOGLE_CLIENT_ID,       // tu client ID de Google
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // tu client secret
      callbackURL: 'http://localhost:3000/auth/google/callback',  // URL de redirección después de la autenticación
      scope: ['email', 'profile'],  // Alcance de los datos que queremos obtener de Google
    });
  }


  // Despues de que Google verifica al usuario, Passport obtiene los tokens y el perfil del usuario y llama a esta función validate.
  async validate(
    accessToken: string,         //Token de acceso proporcionado por Google
    refreshToken: string,        //Token de refresco proporcionado por Google
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, displayName } = profile;  //Extraemos id, emails y displayName del perfil de Google
    const user = {
      provider: 'google',   // Indica que el proveedor es Google(origen del usuario)
      providerId: id,                 // ID unico del usuario en Google
      email: emails[0].value,       // Usamos el primer email del array de emails
      name: displayName,           // Nombre completo del usuario
      accessToken,                // Token de acceso proporcionado por Google
    };
    done(null, user);   //Llamamos a done con null (sin error) y el objeto user creado
  }
}
