import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: (config.get<string>('JWT_ACCESS_SECRET') ?? 'changeme-access') as unknown as string,
    });
  }

  async validate(payload: any) {
    // Cargar usuario con sus roles y permisos desde BD
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      return null;
    }

    // Extraer nombres de roles y permisos
    const roles = user.roles.map((role) => role.nombre);
    const permissions = user.roles.flatMap((role) => role.permissions.map((p) => p.nombre));

    return {
      userId: payload.sub,
      email: payload.email,
      roles,
      permissions,
    };
  }
}



