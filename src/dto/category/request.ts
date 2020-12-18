import {
  IsNotEmpty
} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({
    message: 'createCategoryTitleNotEmpty'
  })
  title: string;
}

export class UpdateCategoryDto {
  @IsNotEmpty({
    message: 'updateCategoryIdNotEmpty'
  })
  id: string;

  @IsNotEmpty({
    message: 'updateCategoryTitleNotEmpty'
  })
  title: string;
}
