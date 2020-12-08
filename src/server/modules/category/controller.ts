import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './service';

@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getHello(): string {
    return this.categoryService.getHello();
  }
}
