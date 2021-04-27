import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Query,
  Param,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PostCommentDto, ReplyCommentDto } from '@/dto/comment/request';
import { CommentListResponse } from '@/dto/comment/response';
import { BaseResponse } from '@/dto/base';

import { CommentService } from './service';
@Controller('/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Put('/post-comment')
  @UseGuards(AuthGuard())
  async postComment(
    @Headers('authorization') authorization: string,
    @Body() comment: PostCommentDto,
  ): Promise<BaseResponse> {
    return this.commentService.postComment(comment);
  }

  @Put('/reply-comment')
  @UseGuards(AuthGuard())
  async replyComment(
    @Headers('authorization') authorization: string,
    @Body() comment: ReplyCommentDto,
  ): Promise<BaseResponse> {
    return this.commentService.replyComment(comment);
  }

  @Put('/like-comment/:id')
  @UseGuards(AuthGuard())
  async likeComment(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ): Promise<void> {}

  @Put('/dislike-comment/:id')
  async dislikeComment(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ): Promise<void> {
  }

  @Get('/list')
  @UseGuards(AuthGuard())
  async list(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<CommentListResponse> {
    return this.commentService.list(page, pageSize);
  }
}
