import { Module } from '@nestjs/common';
import { CommentController } from './controller';
import { CommentService } from './service';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
