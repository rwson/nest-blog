import { IsNotEmpty, IsMongoId } from 'class-validator';

export class PostCommentDto {
  @IsNotEmpty({
    message: 'postCommentContentNotEmpty',
  })
  content: string;

  @IsMongoId({
    message: 'postCommentArticleError',
  })
  article: string;

  identity: number;
}

export class ReplyCommentDto {
  @IsMongoId({
    message: 'replyCommentIdError',
  })
  commentId: string;

  @IsMongoId({
    message: 'replyCommentArticleError',
  })
  article: string;

  @IsMongoId({
    message: 'replyCommentContentNotEmpty',
  })
  content: string;

  identity: number;
}
