import { Controller, Get, Post, Put, Body, Delete, UseGuards, Query, Param, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PostCommentDto, ReplyCommentDto } from '@/dto/comment/request';
import { BaseResponse } from '@/dto/base';

import { CommentService } from './service';
@Controller('/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Put('/post-comment')
  async postComment(@Body() comment: PostCommentDto): Promise<BaseResponse> {
    return this.commentService.postComment(comment);
  }

  @Put('/reply-comment')
  async replyComment(@Body() comment: ReplyCommentDto): Promise<BaseResponse> {
    return this.commentService.replyComment(comment);
  }

  @Get('/list')
  @UseGuards(AuthGuard())
  async list(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10'
  ) {
    return this.commentService.list(page, pageSize);
  }
}
