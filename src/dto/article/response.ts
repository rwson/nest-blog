import { BaseResponse, PageResponseDto } from '../base';

export class ParseMarkdownData {
  html: string;
  name: string;
}

export class ParseMarkdownResponse extends BaseResponse {
  data?: ParseMarkdownData;
}

export class ArticleDetailCreator {
  userName: string;
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
  creator: ArticleDetailCreator;
  id: string;
  title: string;
  content: string;
}

export class QueryTagArticleData extends PageResponseDto {
  data: Array<ArticleDetailData>;
}

export class ArticleDetailResponse extends BaseResponse {
  data: ArticleDetailData;
}

export class QueryTagArticleResponse extends BaseResponse {
  data: QueryTagArticleData;
}
