import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  UseGuards,
  Headers,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import { CreateArticleDto, UpdateArticleDto } from '@/dto/article/request';
import {
  ArticleDetailResponse,
  QueryTagArticleResponse
} from '@/dto/article/response';
import { FileDto, BaseResponse } from '@/dto/base';

import { ArticleService } from './service';

@Controller('/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Put('/create-article')
  @UseGuards(AuthGuard())
  async createArticle(
    @Headers('authorization') authorization: string,
    @Body() article: CreateArticleDto,
  ): Promise<BaseResponse> {
    return this.articleService.createArticle(authorization, article);
  }

  @Post('/update-article')
  @UseGuards(AuthGuard())
  async updateArticle(@Body() article: UpdateArticleDto): Promise<BaseResponse> {
    return this.articleService.updateArticle(article);
  }

  @Get('/detail/:id')
  @UseGuards(AuthGuard())
  async detail(@Param('id') id: string): Promise<ArticleDetailResponse> {
    return this.articleService.detail(id);
  }

  @Delete('/delete-article/:id')
  @UseGuards(AuthGuard())
  async deleteArticle(@Param('id') id: string, @Query('type') type: 'soft' | 'hard'): Promise<BaseResponse> {
    return this.articleService.deleteArticle(id, type);
  }

  @Post('/recovery-article/:id')
  @UseGuards(AuthGuard())
  async recoveryArticle(@Param('id') id: string): Promise<BaseResponse> {
    return this.articleService.recoveryArticle(id);
  }

  @Get('/list/:type')
  @UseGuards(AuthGuard())
  async list(@Param('type') type: 'rubbish' | 'online' | 'draft',@Query('page') page: string, @Query('pageSize') pageSize: string): Promise<QueryTagArticleResponse> {
    return this.articleService.list(type, page, pageSize);
  }

  @Get('/view-detail/:id')
  async viewDetail(@Param('id') id: string): Promise<ArticleDetailResponse> {
    return this.articleService.viewDetail(id);
  }
}
