import { Module } from '@nestjs/common';

import { ArticleModelProvider } from '@/server/models';

import { AuthService, JwtStrategy, injectModules } from '@/server/auth';

import { ArticleController } from './controller';
import { ArticleService } from './service';

@Module({
  imports: [
    ...injectModules
  ],
  controllers: [ArticleController],
  providers: [ArticleModelProvider, ArticleService, AuthService, JwtStrategy]
})
export class ArticleModule {}
