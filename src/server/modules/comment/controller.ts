import {
  Controller,
  Get,
  Put,
  Post,
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

  @Post('/post')
  @UseGuards(AuthGuard())
  async postComment(
    @Headers('authorization') authorization: string,
    @Body() comment: PostCommentDto,
  ): Promise<BaseResponse> {
    return this.commentService.postComment(authorization, comment);
  }

  @Put('/reply')
  @UseGuards(AuthGuard())
  async replyComment(
    @Headers('authorization') authorization: string,
    @Body() comment: ReplyCommentDto,
  ): Promise<BaseResponse> {
    return this.commentService.replyComment(authorization, comment);
  }

  @Put('/like/:id/:type')
  @UseGuards(AuthGuard())
  async likeComment(
    @Param('id') id: string,
    @Param('type') type: string,
    @Headers('authorization') authorization: string,
  ): Promise<BaseResponse> {
    console.log(id);
    return this.commentService.likeComment(id, type, authorization);
  }

  @Put('/dislike/:id/:type')
  async dislikeComment(
    @Param('id') id: string,
    @Param('type') type: string,
    @Headers('authorization') authorization: string,
  ): Promise<BaseResponse> {
    return this.commentService.dislikeComment(id, type, authorization);
  }

  @Get('/list')
  async list(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<CommentListResponse> {
    return this.commentService.list(page, pageSize);
  }
}
