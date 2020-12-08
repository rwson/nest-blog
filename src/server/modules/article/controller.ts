import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './service';

@Controller('/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  getHello(): string {
    return this.articleService.getHello();
  }
}
