import { Injectable, Inject, BadRequestException } from '@nestjs/common';

import { subtract, multiply, divide } from 'ramda';

import { Schema } from 'mongoose';

import { markdown } from 'markdown';

import { AuthService } from '@/server/auth';

import {
  ArticleModelToken,
  ArticleModel,
  ArticleInterface,
} from '@/server/models';
import { ArticleDocument } from '@/server/models/article';

import { FileDto, BaseResponse } from '@/dto/base';
import { CreateArticleDto } from '@/dto/article/request';
import {
  ParseMarkdownData,
  ParseMarkdownResponse,
  ArticleDetailResponse,
  ArticleDetailData,
  QueryTagArticleResponse
} from '@/dto/article/response';

import errorCode from '@/error-code';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(ArticleModelToken) private readonly articleModel: ArticleInterface,
    private readonly authService: AuthService,
  ) {}

  async parseMarkdown(
    file: FileDto | undefined,
  ): Promise<ParseMarkdownResponse> {
    if (file) {
      const content: string = file.buffer.toString();
      const data: ParseMarkdownData = new ParseMarkdownData();
      const html: string = markdown.toHTML(content);

      data.html = html;
      data.name = file.originalname;

      return {
        data,
        ...errorCode.success,
      };
    }

    throw new BadRequestException(errorCode.parseMarkdownNotEmpty);
  }

  async createArticle(
    authorization: string,
    article: CreateArticleDto,
  ): Promise<BaseResponse> {
    const user = this.authService.parse(authorization);
    const id: string = user.id ?? '';

    const tags: Array<Schema.Types.ObjectId> = [];

    if (article.tags) {
      article.tags.split('-').forEach((id: string) => {
        tags.push(new Schema.Types.ObjectId(id));
      });
    }

    const articleInst: ArticleDocument = new ArticleModel({
      creator: id,
      title: article.title,
      content: article.content,
      category: article.category,
      isDraft: article.isDraft,
      tags,
    });

    await articleInst.save();

    return errorCode.success;
  }

  async updateArticle(): Promise<BaseResponse> {

    return errorCode.success;
  }

  async detail(id): Promise<ArticleDetailResponse> {
    const res: ArticleDocument = await this.articleModel
      .findById(id)
      .populate({
        path: 'comments',
        select: 'id nickName email content article reply createdAt',
      })
      .populate({
        path: 'category',
        select: 'title -_id',
      })
      .populate({
        path: 'tags',
        select: 'title color -_id',
      })
      .populate({
        path: 'creator',
        select: 'userName -_id',
      });

    const data: ArticleDetailData = res.toJSON() as ArticleDetailData;

    return {
      ...errorCode.success,
      data,
    };
  }

  async list(type: 'rubbish' | 'online' | 'draft', page: string, pageSize: string): Promise<QueryTagArticleResponse> {
    const pageNum: number = Number(page);
    const limit: number = Number(pageSize);
    const skip: number = multiply(subtract(pageNum, 1), limit);

    const condition: {
      [key: string]: any;
    } = {};

    if (type === 'rubbish') {
      condition.isDeleted = true;
    } else if (type === 'draft') {
      condition.isDraft = true;
    }

    const total: number = await this.articleModel.count(condition);

    const totalPages: number = Math.ceil(divide(total, limit));

    const res: Array<ArticleDocument> = await this.articleModel
    .find(condition)
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'comments',
      select: 'id nickName email content category article reply createdAt',
    })
    .populate({
      path: 'category',
      select: 'title -_id',
    })
    .populate({
      path: 'tags',
      select: 'title color -_id',
    })
    .populate({
      path: 'creator',
      select: 'userName -_id',
    });

    const data: Array<ArticleDetailData> = res.map((article: ArticleDocument): ArticleDetailData => {
      return article.toJSON() as ArticleDetailData;
    });

    return {
      ...errorCode.success,
      data: {
        total,
        totalPages,
        currentPage: pageNum,
        data
      }
    };
  }

  async viewDetail(id): Promise<ArticleDetailResponse> {
    await this.articleModel.findByIdAndUpdate(id, {
      $inc: {
        viewsCount: 1,
      },
    });

    const res: ArticleDocument = await this.articleModel
      .findById(id)
      .populate({
        path: 'comments',
        select: 'id nickName email content article reply createdAt',
      })
      .populate({
        path: 'category',
        select: 'title -_id',
      })
      .populate({
        path: 'tags',
        select: 'title color -_id',
      })
      .populate({
        path: 'creator',
        select: 'userName -_id',
      });

    const data: ArticleDetailData = res.toJSON() as ArticleDetailData;

    return {
      ...errorCode.success,
      data,
    };
  }
}
