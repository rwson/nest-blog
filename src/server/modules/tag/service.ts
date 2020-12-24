import {
  Injectable,
  Inject,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { subtract, multiply, divide } from 'ramda';

import * as Transaction from 'mongoose-transactions';

import { AuthService } from '@/server/auth';

import {
  TagModelToken,
  TagModel,
  TagInterface,
  ArticleModel,
} from '@/server/models';
import { TagDocument } from '@/server/models/tag';

import { CreateTagDto, UpdateTagDto } from '@/dto/tag/request';
import {
  QueryTagListResponse,
  QueryTagDetailResponse,
  TagListItem,
} from '@/dto/tag/response';
import { BaseResponse } from '@/dto/base';

import errorCode from '@/error-code';

const [tagName, articleName] = [
  TagModel.collection.collectionName,
  ArticleModel.collection.collectionName,
];

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

  async detail(id: string): Promise<QueryTagDetailResponse> {
    const tag: TagDocument = await this.tagModel.findById(id);
    const data: TagListItem = tag.toJSON() as TagListItem;

    return {
      ...errorCode.success,
      data,
    };
  }

  async deleteTag(id: string): Promise<BaseResponse> {
    const transaction: Transaction = new Transaction();

    try {
      await transaction.delete(tagName, id);

      await transaction.update(
        articleName,
        {
          tags: {
            $elemMatch: id,
          },
        },
        {
          $pull: {
            tags: id,
          },
        },
        {
          multi: true,
        },
      );

      await transaction.run();

      return errorCode.success;
    } catch (e) {
      transaction.rollback();
      throw new InternalServerErrorException(e);
    }
  }

  async list(page: string, pageSize: string): Promise<QueryTagListResponse> {
    const pageNum: number = Number(page);
    const limit: number = Number(pageSize);
    const skip: number = multiply(subtract(pageNum, 1), limit);

    const total: number = await this.tagModel.count({});

    const totalPages: number = Math.ceil(divide(total, limit));

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
        total,
        totalPages,
        currentPage: pageNum,
        data,
      },
    };
  }
}
