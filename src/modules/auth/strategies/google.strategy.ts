import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/modules/users/users.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly config: ConfigService, private readonly usersService: UsersService) {
    super({
      clientID: config.get<string>('google.clientId') || '',
      clientSecret: config.get<string>('google.clientSecret') || '',
      callbackURL: config.get<string>('google.callbackUrl') || '/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user?: any) => void) {
    try {
      const email = profile.emails?.[0]?.value;
      const firstName = profile.name?.givenName || 'Google';
      const lastName = profile.name?.familyName || 'User';

      if (!email) return done(null, false);

      let user = await this.usersService.findByEmail(email);
      if (!user) {
        const dto: CreateUserDto = {
          firstName,
          lastName,
          email,
          password: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
        } as any;
        user = await this.usersService.create(dto);
      }

      (user as any).password = undefined;
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  }
}
