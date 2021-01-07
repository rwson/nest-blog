import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({
    message: 'createArticleTitleNotEmpty',
  })
  title: string;

  @IsNotEmpty({
    message: 'createArticleContentNotEmpty',
  })
  source: string;

  category: string;

  publishDate: string;

  isDraft: boolean;

  tags: string;
}

export class UpdateArticleDto extends CreateArticleDto {
  @IsMongoId({
    message: 'updateArticleIdError',
  })
  id: string;

  @IsNotEmpty({
    message: 'updateArticleTitleNotEmpty',
  })
  title: string;

  @IsNotEmpty({
    message: 'updateArticleContentNotEmpty',
  })
  source: string;
}
