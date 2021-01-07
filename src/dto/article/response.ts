import { BaseResponse, PageResponseDto } from '../base';

export class ParseMarkdownData {
  html: string;
  name: string;
}

export class ArticleDetailCreator {
  userName: string;
}

export class ArticleDetailTag {
  id: string;
  title: string;
  color: string;
}

export class ArticleDetailCategory {
  id: string;
  title: string;
}

export class ArticleDetailComment {
  id: string;
  nickName: string;
  article: string;
  email: string;
  website: string;
  content: string;
  source: string;
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
  source: string;
  publishDate: string;
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
