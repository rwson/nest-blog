import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';

import * as mongoose from 'mongoose';

import * as Transaction from 'mongoose-transactions';

import { AuthService } from '@/server/auth';

import { CommentModelToken, CommentModel, ArticleModel, CommentInterface } from '@/server/models';
import { CommentDocument } from '@/server/models/comment';

import { PostCommentDto, ReplyCommentDto } from '@/dto/comment/request';
import { BaseResponse } from '@/dto/base';

import errorCode from '@/error-code';

const [
  commentName,
  articleName
] = [
  CommentModel.collection.collectionName,
  ArticleModel.collection.collectionName
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
      const commentId: mongoose.Types.ObjectId = await transaction.insert(commentName, {
        nickName: comment.nickName,
        email: comment.email,
        website: comment.website,
        content: comment.content,
        article: comment.article,
        identity: comment.identity
      });

      await transaction.update(articleName, comment.article, {
        $push: {
          comments: commentId
        },
        $inc: {
          commentCount: 1
        }
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
      const commentId: mongoose.Types.ObjectId = await transaction.insert(commentName, {
        nickName: comment.nickName,
        email: comment.email,
        website: comment.website,
        content: comment.content,
        article: comment.article,
        identity: comment.identity
      });

      await transaction.update(commentName, comment.comment, {
        $set: {
          reply: commentId
        }
      });
  
      await transaction.update(articleName, comment.article, {
        $inc: {
          commentCount: 1
        }
      });
  
      await transaction.run();
  
      return errorCode.success;
    } catch (e) {
      transaction.rollback();
      throw new InternalServerErrorException(e);
    }
  }

  

}
