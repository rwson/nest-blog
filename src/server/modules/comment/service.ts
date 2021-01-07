import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';

import * as mongoose from 'mongoose';

import * as Transaction from 'mongoose-transactions';

import { subtract, multiply, divide, map } from 'ramda';

import { AuthService } from '@/server/auth';

import {
  CommentModelToken,
  CommentModel,
  ArticleModel,
  CommentInterface,
} from '@/server/models';
import { CommentDocument } from '@/server/models/comment';

import { PostCommentDto, ReplyCommentDto } from '@/dto/comment/request';
import { CommentItem, CommentWithArticle, CommentListResponse } from '@/dto/comment/response';
import { BaseResponse } from '@/dto/base';

import errorCode from '@/error-code';

const [commentName, articleName] = [
  CommentModel.collection.collectionName,
  ArticleModel.collection.collectionName,
];

@Injectable()
export class CommentService {
  constructor(
    @Inject(CommentModelToken) private readonly commentModel: CommentInterface,
    private readonly authService: AuthService,
  ) {}

  async postComment(comment: PostCommentDto): Promise<BaseResponse> {
    const transaction: Transaction = new Transaction();

    try {
      const commentId: mongoose.Types.ObjectId = await transaction.insert(
        commentName,
        {
          nickName: comment.nickName,
          email: comment.email,
          website: comment.website,
          content: comment.content,
          article: comment.article,
          identity: comment.identity,
          isReply: false,
        },
      );

      await transaction.update(articleName, comment.article, {
        $push: {
          comments: commentId,
        },
        $inc: {
          commentCount: 1,
        },
      });

      await transaction.run();

      return errorCode.success;
    } catch (e) {
      transaction.rollback();
      throw new InternalServerErrorException(e);
    }
  }

  async replyComment(comment: ReplyCommentDto): Promise<BaseResponse> {
    const transaction: Transaction = new Transaction();

    try {
      const commentId: mongoose.Types.ObjectId = await transaction.insert(
        commentName,
        {
          nickName: comment.nickName,
          email: comment.email,
          website: comment.website,
          content: comment.content,
          article: comment.article,
          identity: comment.identity,
          isReply: true,
        },
      );

      await transaction.update(commentName, comment.comment, {
        $set: {
          reply: commentId,
        },
      });

      await transaction.run();

      return errorCode.success;
    } catch (e) {
      transaction.rollback();
      throw new InternalServerErrorException(e);
    }
  }

  async list(page: string, pageSize: string): Promise<CommentListResponse> {
    const pageNum: number = Number(page);
    const limit: number = Number(pageSize);
    const skip: number = multiply(subtract(pageNum, 1), limit);

    const total: number = await this.commentModel.count({
      isReply: false,
    });

    const totalPages: number = Math.ceil(divide(total, limit));

    const res: Array<CommentDocument> = await this.commentModel
      .find({
        isReply: false,
      })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'reply',
        select: 'id nickName email content article reply createdAt',
      })
      .populate({
        path: 'article',
        select: 'title',
      });

    const maps: {
      [key: string]: number;
    } = {};

    const list: Array<CommentWithArticle> = [];

    res.forEach((comment: CommentDocument) => {
      const item = comment.toJSON() as CommentItem;

      if (maps[item.article.id] === undefined) {
        maps[item.article.id] = list.length;
        list.push({
          id: item.article.id,
          title: item.article.title,
          comments: [
            item
          ]
        });
      } else {
        const index = maps[item.article.id];
        list[index].comments.push(item);
      }
    });

    return {
      ...errorCode.success,
      data: {
        total,
        totalPages,
        currentPage: pageNum,
        data: list
      },
    };
  }
}
