import { Controller, Get, Post, Put, Body, UseGuards, Headers, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import { CreateArticleDto } from '@/dto/article/request';
import { ParseMarkdownResponse, ArticleDetailResponse } from '@/dto/article/response';
import { FileDto, BaseResponse } from '@/dto/base';

import { ArticleService } from './service';

@Controller('/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/parse-markdown')
  @UseInterceptors(FileInterceptor('file'))
  async parseMarkdown(@UploadedFile('file') file: FileDto | undefined): Promise<ParseMarkdownResponse> {
    return this.articleService.parseMarkdown(file);
  }

  @Put('/create-article')
  @UseGuards(AuthGuard())
  async createArticle(@Headers('authorization') authorization: string, @Body() article: CreateArticleDto): Promise<BaseResponse> {
    return this.articleService.createArticle(authorization, article);
  }

  @Post('/update-article')
  @UseGuards(AuthGuard())
  async updateArticle(@Body() article: CreateArticleDto) {
  }

  @Get('/detail/:id')
  @UseGuards(AuthGuard())
  async detail(@Param('id') id: string): Promise<ArticleDetailResponse> {
    return this.articleService.detail(id);
  }

  @Get('/view/:id')
  async viewDetail(@Param('id') id: string): Promise<ArticleDetailResponse> {
    return this.articleService.viewDetail(id);
  }

}
