import { BaseResponse, PageResponseDto } from '../base';

export class CommentArticle {
  id: string;
  title: string;
}
export class CommentItem {
  id: string;
  nickName: string;
  email: string;
  website: string;
  content: string;
  article: CommentArticle;
  reply: Array<CommentItem>;
}

export class CommentWithArticle extends CommentArticle {
  comments: Array<CommentItem>;
}
export class CommentListData extends PageResponseDto {
  data: Array<CommentWithArticle>;
}

export class CommentListResponse extends BaseResponse {
  data: CommentListData;
}
