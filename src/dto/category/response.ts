import { BaseResponse, PageResponseDto } from '../base';

export class CategoryCreatorItem {
  userName: string;
}

export class CategoryListItem {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  creator: CategoryCreatorItem;
}

export class QueryCategoryListData extends PageResponseDto {
  data: Array<CategoryListItem>;
}

export class QueryCategoryListResponse extends BaseResponse {
  data: QueryCategoryListData;
}

export class QueryCategoryListAllResponse extends BaseResponse {
  data: Array<CategoryListItem>;
}

export class QueryCategoryDetailResponse extends BaseResponse {
  data: CategoryListItem;
}
