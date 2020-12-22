import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty({
    message: 'createTagTitleNotEmpty',
  })
  title: string;

  @IsNotEmpty({
    message: 'createTagColorNotEmpty',
  })
  color: string;
}

export class UpdateTagDto {
  @IsMongoId({
    message: 'updateTagIdError',
  })
  id: string;

  @IsNotEmpty({
    message: 'updateTagTitleNotEmpty',
  })
  title: string;

  @IsNotEmpty({
    message: 'updateTagColorNotEmpty',
  })
  color: string;
}
