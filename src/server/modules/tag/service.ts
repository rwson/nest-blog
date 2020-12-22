import { Injectable, Inject, BadRequestException } from '@nestjs/common';

import { subtract, multiply, divide } from 'ramda';

import { AuthService } from '@/server/auth';

import { TagModelToken, TagModel, TagInterface } from '@/server/models';
import { TagDocument } from '@/server/models/tag';

import { CreateTagDto, UpdateTagDto } from '@/dto/tag/request';
import {
  QueryTagListResponse,
  QueryTagDetailResponse,
  TagListItem,
} from '@/dto/tag/response';
import { BaseResponse } from '@/dto/base';

import errorCode from '@/error-code';

@Injectable()
export class TagService {
  constructor(
    @Inject(TagModelToken) private readonly tagModel: TagInterface,
    private readonly authService: AuthService,
  ) {}

  async createTag(
    authorization: string,
    tag: CreateTagDto,
  ): Promise<BaseResponse> {
    const user = this.authService.parse(authorization);
    const id: string = user.id ?? '';

    const tagInst: TagDocument = new TagModel({
      color: tag.color,
      title: tag.title,
      creator: id,
    });

    await tagInst.save();

    return errorCode.success;
  }

  async updateTag(tag: UpdateTagDto): Promise<BaseResponse> {
    const id: string = await tag.id;

    delete tag.id;

    await this.tagModel.findByIdAndUpdate(id, tag);

    return errorCode.success;
  }

  async deleteTag(id: string): Promise<BaseResponse> {
    await this.tagModel.findByIdAndRemove(id);

    return errorCode.success;
  }

  async detail(id: string): Promise<QueryTagDetailResponse> {
    const tag: TagDocument = await this.tagModel.findById(id);
    const data: TagListItem = tag.toJSON() as TagListItem;

    return {
      ...errorCode.success,
      data,
    };
  }

  async list(page: string, pageSize: string): Promise<QueryTagListResponse> {
    const pageNum: number = Number(page);
    const limit: number = Number(pageSize);
    const skip: number = multiply(subtract(pageNum, 1), limit);

    const count: number = await this.tagModel.count({});

    const totalPages: number = Math.ceil(divide(count, limit));

    const res: Array<TagDocument> = await this.tagModel
      .find({})
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'creator',
        select: 'userName -_id',
      });

    const data: Array<TagListItem> = res.map(
      (tag: TagDocument): TagListItem => {
        return tag.toJSON() as TagListItem;
      },
    );

    return {
      ...errorCode.success,
      data: {
        totalPages,
        currentPage: pageNum,
        data,
      },
    };
  }
}
