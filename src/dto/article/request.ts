import {
  IsNotEmpty,
  IsMongoId
} from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({
    message: 'createArticleTitleNotEmpty'
  })
  title: string;

  @IsNotEmpty({
    message: 'createArticleContentNotEmpty'
  })
  content: string;

  category: string;

  isDraft: boolean;

  tags: string;
}

export class UpdateArticleDto {
  @IsMongoId({
    message: ''
  })
  id: string;

  @IsNotEmpty({
    message: 'createArticleTitleNotEmpty'
  })
  title: string;

  @IsNotEmpty({
    message: 'createArticleContentNotEmpty'
  })
  content: string;

  category: string;

  isDraft: boolean;

  tags: string;
}
