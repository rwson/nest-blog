import {
  IsNotEmpty
} from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({
    message: 'loginAccountNotEmpty'
  })
  account: string;

  @IsNotEmpty({
    message: 'loginPasswordNotEmpty'
  })
  password: string;
}
