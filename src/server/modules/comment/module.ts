import { Module } from '@nestjs/common';

import { CommentModelProvider } from '@/server/models';

import { AuthService, JwtStrategy, injectModules } from '@/server/auth';

import { CommentController } from './controller';
import { CommentService } from './service';

@Module({
  imports: [...injectModules],
  controllers: [CommentController],
  providers: [CommentModelProvider, CommentService, AuthService, JwtStrategy],
})
export class CommentModule {}
