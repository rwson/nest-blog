import {
  IsNotEmpty,
  IsMongoId
} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({
    message: 'createCategoryTitleNotEmpty'
  })
  title: string;
}

export class UpdateCategoryDto {
  @IsMongoId({
    message: 'updateCategoryIdError'
  })
  id: string;

  @IsNotEmpty({
    message: 'updateCategoryTitleNotEmpty'
  })
  title: string;
}
