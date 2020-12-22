import { BaseResponse } from '../base';

export class ParseMarkdownData {
  html: string;
  name: string;
}

export class ParseMarkdownResponse extends BaseResponse {
  data?: ParseMarkdownData;
}

export class ArticleDetailTag {
  title: string;
  color: string;
}

export class ArticleDetailCategory {
  title: string;
}

export class ArticleDetailComment {
  id: string;
  nickName: string;
  article: string;
  email: string;
  website: string;
  content: string;
  reply: Array<ArticleDetailComment>;
}

export class ArticleDetailData {
  isDraft: boolean;
  isDeleted: boolean;
  commentCount: number;
  viewsCount: number;
  tags: Array<ArticleDetailTag>;
  comment: Array<ArticleDetailComment>;
  category: ArticleDetailCategory;
  id: string;
  title: string;
  content: string;
}

export class ArticleDetailResponse extends BaseResponse {
  data: ArticleDetailData;
}