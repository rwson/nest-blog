import {
  IsNotEmpty
} from 'class-validator';

export class CreateArticleDto {
  
  @IsNotEmpty('createArticleTitleNotEmpty')
  title: string;

  @IsNotEmpty('createArticleContentNotEmpty')
  content: string;

  category: string;

  isDraft: boolean;

  tags: Array<string>;

}
