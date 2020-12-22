import {
  IsNotEmpty,
  IsMongoId
} from 'class-validator';

export class PostCommentDto {

  @IsNotEmpty({
    message: 'postCommentArticleError'
  })
  nickName: string;

  @IsNotEmpty({
    message: 'postCommentEmailNotEmpty'
  })
  email: string;

  @IsNotEmpty({
    message: 'postCommentContentNotEmpty'
  })
  content: string;

  @IsMongoId({
    message: 'postCommentArticleError'
  })
  article: string;

  website: string;

  identity: number;

}

export class ReplyCommentDto {

  @IsNotEmpty({
    message: 'replyCommentArticleError'
  })
  nickName: string;

  @IsNotEmpty({
    message: 'replyCommentEmailNotEmpty'
  })
  email: string;

  @IsNotEmpty({
    message: 'replyCommentContentNotEmpty'
  })
  content: string;

  @IsMongoId({
    message: 'replyCommentArticleError'
  })
  article: string;

  @IsMongoId({
    message: 'replyCommentArticleError'
  })
  comment: string;

  website: string;

  identity: number;

}
