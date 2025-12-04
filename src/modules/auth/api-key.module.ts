import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from './entities/api-key.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiKeyScopesGuard } from 'src/common/guards/api-key-scopes.guard';
import { ExternalController } from './controllers/api-key.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApiKey])],
  providers: [ApiKeyGuard, ApiKeyScopesGuard, ExternalController],
  exports: [ApiKeyGuard, ApiKeyScopesGuard,ExternalController],
})
export class ApiKeyModule {}
