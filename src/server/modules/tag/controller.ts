import { Controller, Get, Post, Put, Body, Delete, UseGuards, Headers } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import { CreateTagDto, UpdateTagDto } from '@/dto/tag/request';
import { BaseDto } from '@/dto/base';
import { ParseMarkdownResponse } from '@/dto/article/response';

import { TagService } from './service';

@Controller('/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Put('/create-tag')
  @UseGuards(AuthGuard())
  async createTag(
    @Headers('authorization') authorization: string,
    @Body() tag: CreateTagDto
  ): Promise<BaseDto> {
    return this.tagService.createTag(authorization, tag);
  }

  @Post('/update-tag')
  @UseGuards(AuthGuard())
  async updateTag(@Body() tag: UpdateTagDto) {
    return this.tagService.updateTag(tag);
  }

  @Delete('/delete-tag/:id')
  @UseGuards(AuthGuard())
  async deleteTag() {
    
  }

  @Get('/detail/:id')
  async detail() {
    
  }

  @Get('/list')
  async list() {
    return this.tagService.list();
  }

}
