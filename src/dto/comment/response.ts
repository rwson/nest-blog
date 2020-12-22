import { BaseResponse, PageResponseDto } from '../base';

export class CommentItem {
  id: string;
  nickName: string;
  article: string;
  email: string;
  website: string;
  content: string;
  reply: Array<CommentItem>;
}

export class CommentListData extends PageResponseDto {
  data: Array<CommentItem>;
}

export class CommentListResponse extends BaseResponse {
  data: CommentListData;
}
