import { Injectable, Inject, BadRequestException } from '@nestjs/common';

import { AuthService } from '@/server/auth';

import { TagModelToken, TagModel, TagInterface } from '@/server/models';
import { TagDocument } from '@/server/models/tag';

import { CreateTagDto, UpdateTagDto } from '@/dto/tag/request';
import { BaseDto } from '@/dto/base';
import { ParseMarkdownData, ParseMarkdownResponse } from '@/dto/article/response';

import errorCode from '@/error-code';

@Injectable()
export class TagService {
  constructor(
    @Inject(TagModelToken) private readonly tagModel: TagInterface,
    private readonly authService: AuthService
  ) {}


  async createTag(
    authorization: string,
    tag: CreateTagDto
  ): Promise<BaseDto> {
    const user = this.authService.parse(authorization);
    const id: string = user.id ?? '';

    const tagInst: TagDocument = new TagModel({
      color: tag.color,
      title: tag.title,
      creator: id
    });

    await tagInst.save();

    return errorCode.success;
  }


  async updateTag(
    tag: UpdateTagDto
  ) {
  }

  async deleteTag() {
    
  }

  async detail() {
    
  }

  async list() {

    console.log((TagModel as any).paginate)

    const res: Array<TagDocument> = await TagModel.find().populate({
      path: 'creator',
      select: 'userName'
    });

    return res;
  }
  
}
