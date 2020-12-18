import { Controller, Get, Post, Put, Body, Delete, UseGuards, Query, Param, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateCategoryDto, UpdateCategoryDto } from '@/dto/category/request';
import { QueryCategoryDetailResponse, QueryCategoryListResponse } from '@/dto/category/response';
import { BaseDto } from '@/dto/base';

import { CategoryService } from './service';

@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Put('/create-category')
  @UseGuards(AuthGuard())
  async createCategory(
    @Headers('authorization') authorization: string,
    @Body() category: CreateCategoryDto
  ): Promise<BaseDto> {
    return this.categoryService.createCategory(authorization, category);
  }

  @Post('/update-category')
  @UseGuards(AuthGuard())
  async updateCategory(@Body() category: UpdateCategoryDto): Promise<BaseDto> {
    return this.categoryService.updateCategory(category);
  }

  @Delete('/delete-category/:id')
  @UseGuards(AuthGuard())
  async deleteCategory(@Param('id') id: string): Promise<BaseDto> {
    return this.categoryService.deleteCategory(id);
  }

  @Get('/detail/:id')
  async detail(@Param('id') id: string): Promise<QueryCategoryDetailResponse> {
    return this.categoryService.detail(id);
  }

  @Get('/list')
  async list(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10'
  ): Promise<QueryCategoryListResponse> {
    return this.categoryService.list(page, pageSize);
  }
}
