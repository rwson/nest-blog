import { Module } from '@nestjs/common';

import { TagModelProvider } from '@/server/models';

import { AuthService, JwtStrategy, injectModules } from '@/server/auth';

import { TagController } from './controller';
import { TagService } from './service';

@Module({
  imports: [...injectModules],
  controllers: [TagController],
  providers: [TagModelProvider, TagService, AuthService, JwtStrategy],
})
export class TagModule {}
