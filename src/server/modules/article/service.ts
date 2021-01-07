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
import { CreateArticleDto, UpdateArticleDto } from '@/dto/article/request';
import {
  ParseMarkdownData,
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

  async createArticle(
    authorization: string,
    article: CreateArticleDto,
  ): Promise<BaseResponse> {
    const user = this.authService.parse(authorization);
    const id: string = user.id ?? '';
    const data: ParseMarkdownData = new ParseMarkdownData();
    const tags: Array<string> = article.tags.split('-');
    const content: string = markdown.toHTML(article.source);

    const articleInst: ArticleDocument = new ArticleModel({
      creator: id,
      title: article.title,
      source: article.source,
      category: article.category,
      isDraft: article.isDraft,
      publishDate: article.publishDate,
      tags,
      content
    });

    await articleInst.save();

    return errorCode.success;
  }

  async updateArticle(article: UpdateArticleDto): Promise<BaseResponse> {
    const id: string = article.id;
    const data: ParseMarkdownData = new ParseMarkdownData();
    const tags: Array<string> = article.tags.split('-');
    const content: string = markdown.toHTML(article.source);

    delete article.id;

    await this.articleModel.findByIdAndUpdate(id, {
      title: article.title,
      source: article.source,
      category: article.category,
      isDraft: article.isDraft,
      publishDate: article.publishDate,
      tags,
      content
    });

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
        select: 'title id',
      })
      .populate({
        path: 'tags',
        select: 'title color id',
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

  async deleteArticle(id: string, type: 'soft' | 'hard'): Promise<BaseResponse> {
    if (type === 'soft') {
      await this.articleModel.findByIdAndUpdate(id, {
        isDeleted: true
      });
    } else {
      await this.articleModel.findByIdAndRemove(id);
    }

    return errorCode.success;
  }

  async recoveryArticle(id: string): Promise<BaseResponse> {
    await this.articleModel.findByIdAndUpdate(id, {
      isDeleted: false
    });

    return errorCode.success;
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
    } else {
      condition.isDraft = false;
      condition.isDeleted = false;
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
      .select('id commentCount viewsCount tags comments publishDate title category source')
      .populate({
        path: 'comments',
        select: 'id nickName email content article reply createdAt',
      })
      .populate({
        path: 'category',
        select: 'title',
      })
      .populate({
        path: 'tags',
        select: 'title color',
      });

    const data: ArticleDetailData = res.toJSON() as ArticleDetailData;

    return {
      ...errorCode.success,
      data,
    };
  }
}
