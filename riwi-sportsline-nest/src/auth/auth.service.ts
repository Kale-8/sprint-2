import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { compareHash, hashString } from '../common/utils/hash.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  private parseDurationToSeconds(input: string | undefined, fallbackSeconds: number): number {
    if (!input) return fallbackSeconds;
    const m = input.match(/^(\d+)([smhd])?$/i);
    if (!m) return fallbackSeconds;
    const value = parseInt(m[1], 10);
    const unit = (m[2] || 's').toLowerCase();
    const factor = unit === 's' ? 1 : unit === 'm' ? 60 : unit === 'h' ? 3600 : 86400;
    return value * factor;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await compareHash(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, role: user.rol, email: user.email };
    const accessExp = this.parseDurationToSeconds(this.config.get<string>('JWT_ACCESS_EXPIRES') ?? '900', 900);
    const refreshExp = this.parseDurationToSeconds(this.config.get<string>('JWT_REFRESH_EXPIRES') ?? '604800', 604800);
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: accessExp,
    } as any);
    const refreshToken = await this.jwtService.signAsync({ sub: user.id }, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: refreshExp,
    } as any);
    const refreshHash = await hashString(refreshToken);
    await this.userRepository.update({ id: user.id }, { refreshTokenHash: refreshHash });
    return { accessToken, refreshToken };
  }

  async refresh(userId: number, token: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || !user.refreshTokenHash) throw new UnauthorizedException();
    const ok = await compareHash(token, user.refreshTokenHash);
    if (!ok) throw new UnauthorizedException();
    return this.login(user);
  }

  async logout(userId: number) {
    await this.userRepository.update({ id: userId }, { refreshTokenHash: null });
  }
}


