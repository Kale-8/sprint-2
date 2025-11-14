import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';//Esta importancion sirve para crear estrategias de autenticacion
import { ExtractJwt, Strategy } from 'passport-jwt';//Importamos las estrategias de JWT desde passport-jwt
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) throw new Error('JWT_SECRET es requerido en las variables de entorno');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//Extraemos el token del encabezado Authorization como Bearer token
      ignoreExpiration: false, //No ignorar la expiración del token porque esta en falso
      secretOrKey: secret, //Clave secreta para verificar la firma del token
    });
  }

  async validate(payload: any) { //Funcion asincrona para traer el payload que contiene id, email, role
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}

