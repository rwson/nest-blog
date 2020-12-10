import { Controller, Get, Post, Put, Body, UseGuards, Headers, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import { FileDto } from '@/dto/base';
import { ParseMarkdownResponse } from '@/dto/article/response';

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
  async createArticle() {
    
  }

}
