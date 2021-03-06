import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  UseGuards,
  Query,
  Param,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateTagDto, UpdateTagDto } from '@/dto/tag/request';
import {
  QueryTagListResponse,
  QueryTagDetailResponse,
  QueryTagListAllResponse
} from '@/dto/tag/response';
import { BaseResponse } from '@/dto/base';

import { TagService } from './service';

@Controller('/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Put('/create-tag')
  @UseGuards(AuthGuard())
  async createTag(
    @Headers('authorization') authorization: string,
    @Body() tag: CreateTagDto,
  ): Promise<BaseResponse> {
    return this.tagService.createTag(authorization, tag);
  }

  @Post('/update-tag')
  @UseGuards(AuthGuard())
  async updateTag(@Body() tag: UpdateTagDto): Promise<BaseResponse> {
    return this.tagService.updateTag(tag);
  }

  @Delete('/delete-tag/:id')
  @UseGuards(AuthGuard())
  async deleteTag(@Param('id') id: string): Promise<BaseResponse> {
    return this.tagService.deleteTag(id);
  }

  @Get('/detail/:id')
  async detail(@Param('id') id: string): Promise<QueryTagDetailResponse> {
    return this.tagService.detail(id);
  }

  @Get('/list')
  async list(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<QueryTagListResponse> {
    return this.tagService.list(page, pageSize);
  }

  @Get('/list-all')
  async listAll(): Promise<QueryTagListAllResponse> {
    return this.tagService.listAll();
  }
}
