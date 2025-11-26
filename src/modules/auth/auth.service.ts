import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { LoginDto } from './dto/login.dto';

function parseDuration(input: string): number {
  // supports: 1000ms, 900s, 15m, 1h, 7d
  const match = String(input).match(/^(\d+)(ms|s|m|h|d)$/);
  if (!match) return 0;
  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case 'ms':
      return value;
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @InjectRepository(RefreshToken)
    private readonly refreshRepo: Repository<RefreshToken>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  private async signAccessToken(user: any): Promise<string> {
    const payload = {
      sub: user.id,
      roles: Array.isArray(user.roles) ? user.roles.map((r: any) => r?.name ?? r) : [],
    };
    const secret = this.config.get<string>('jwt.secret') ?? 'changeme';
    const expiresIn = (this.config.get<string>('jwt.expiresIn') ?? '900s') as any;
    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }

  private async signRefreshToken(user: any): Promise<string> {
    const payload = { sub: user.id };
    const secret = this.config.get<string>('jwt.refreshSecret') || this.config.get<string>('jwt.secret') || 'changeme_refresh';
    const expiresIn = (this.config.get<string>('jwt.refreshExpiresIn') || '7d') as any;
    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }

  private async persistRefreshToken(userId: string, token: string) {
    const expiresStr = this.config.get<string>('jwt.refreshExpiresIn') || '7d';
    const ms = parseDuration(expiresStr);
    const expiresAt = new Date(Date.now() + (ms || 0));
    const tokenHash = await bcrypt.hash(token, 10);

    // revoke previous active tokens (single active token policy)
    await this.refreshRepo.update({ user: { id: userId }, isRevoked: false }, { isRevoked: true });

    const entity = this.refreshRepo.create({
      user: { id: userId } as any,
      tokenHash,
      expiresAt,
      isRevoked: false,
    });
    await this.refreshRepo.save(entity);
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    const accessToken = await this.signAccessToken(user);
    const refreshToken = await this.signRefreshToken(user);
    await this.persistRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async issueTokensForUser(user: any) {
    const accessToken = await this.signAccessToken(user);
    const refreshToken = await this.signRefreshToken(user);
    await this.persistRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const secret = this.config.get<string>('jwt.refreshSecret') || this.config.get<string>('jwt.secret');
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, { secret });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const userId = payload?.sub;
    if (!userId) throw new UnauthorizedException('Invalid refresh token');

    const latest = await this.refreshRepo.findOne({
      where: { user: { id: userId }, isRevoked: false },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
    if (!latest) throw new UnauthorizedException('Refresh token not found');

    const match = await bcrypt.compare(refreshToken, latest.tokenHash);
    if (!match) throw new UnauthorizedException('Invalid refresh token');
    if (latest.expiresAt < new Date()) throw new UnauthorizedException('Refresh token expired');

    const user = await this.usersService.findOne(userId);
    const accessToken = await this.signAccessToken(user);

    // rotate refresh token
    await this.refreshRepo.update(latest.id as any, { isRevoked: true });
    const newRefresh = await this.signRefreshToken(user);
    await this.persistRefreshToken(user.id, newRefresh);

    return { accessToken, refreshToken: newRefresh };
  }
}
