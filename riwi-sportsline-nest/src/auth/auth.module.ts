import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { ApiKey } from './entities/api-key.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { ApiKeysService } from './api-keys.service';
import { ApiKeysController } from './api-keys.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission, ApiKey]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  controllers: [AuthController, ApiKeysController],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshTokenStrategy,
    ApiKeyStrategy,
    GoogleStrategy,
    ApiKeysService,
  ],
  exports: [AuthService, TypeOrmModule, ApiKeysService],
})
export class AuthModule {}
