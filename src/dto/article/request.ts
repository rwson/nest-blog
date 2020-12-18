import {
  IsNotEmpty
} from 'class-validator';

export class CreateArticleDto {
  
  title: string;

  content: string;

  category: string;

  isDraft: boolean;

  tags: Array<string>;

}
