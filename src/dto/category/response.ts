import { BaseDto, PageResponseDto } from '../base';

export class CategoryCreatorItem {
  userName: string;  
}

export class CategoryListItem {
  title: string;
  createdAt: string;
  updatedAt: string;
  creator: CategoryCreatorItem;
}

export class QueryCategoryListData extends PageResponseDto {
  data: Array<CategoryListItem>;
}

export class QueryCategoryListResponse extends BaseDto {
  data: QueryCategoryListData;
}

export class QueryCategoryDetailResponse extends BaseDto {
  data: CategoryListItem;
}