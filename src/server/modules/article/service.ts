import { Injectable, Inject, BadRequestException } from '@nestjs/common';

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
