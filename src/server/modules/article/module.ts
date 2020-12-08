import { Module } from '@nestjs/common';

import { ArticleModelProvider } from '@/server/models';

import { ArticleController } from './controller';
import { ArticleService } from './service';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleModelProvider, ArticleService]
})
export class ArticleModule {}
