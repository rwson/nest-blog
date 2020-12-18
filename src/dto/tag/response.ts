import { BaseDto, PageResponseDto } from '../base';

export class TagCreatorItem {
  userName: string;  
}

export class TagListItem {
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  creator: TagCreatorItem;
}

export class QueryTagListData extends PageResponseDto {
  data: Array<TagListItem>;
}

export class QueryTagListResponse extends BaseDto {
  data: QueryTagListData;
}

export class QueryTagDetailResponse extends BaseDto {
  data: TagListItem;
}