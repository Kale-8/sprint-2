import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/user.entity';
import { Role } from '../entities/role.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    config: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {
    super({
      clientID: config.get<string>('GOOGLE_CLIENT_ID') || 'your-client-id',
      clientSecret:
        config.get<string>('GOOGLE_CLIENT_SECRET') || 'your-client-secret',
      callbackURL:
        config.get<string>('GOOGLE_CALLBACK_URL') ||
        'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    const email = emails && emails.length > 0 ? emails[0].value : null;

    if (!email) {
      return done(new Error('No email found in Google profile'), false);
    }

    // Buscar usuario por Google ID o email
    let user = await this.userRepository.findOne({
      where: [{ googleId: id }, { email }],
      relations: ['roles'],
    });

    if (user) {
      // Si el usuario existe pero no tiene googleId, vincularlo
      if (!user.googleId) {
        user.googleId = id;
        user.avatar = photos && photos.length > 0 ? photos[0].value : null;
        user.provider = 'google';
        await this.userRepository.save(user);
      }
    } else {
      // Crear nuevo usuario con datos de Google
      user = this.userRepository.create({
        nombre: displayName,
        email,
        googleId: id,
        avatar: photos && photos.length > 0 ? photos[0].value : null,
        provider: 'google',
        passwordHash: null, // No hay password para usuarios OAuth
      });

      user = await this.userRepository.save(user);

      // Asignar rol por defecto (vendedor)
      const vendedorRole = await this.roleRepository.findOne({
        where: { nombre: 'vendedor' },
      });

      if (vendedorRole) {
        user.roles = [vendedorRole];
        await this.userRepository.save(user);
      }
    }

    done(null, user);
  }
}
