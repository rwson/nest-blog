import {
  IsNotEmpty
} from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty({
    message: 'loginAccountNotEmpty'
  })
  account: string;

  @IsNotEmpty({
    message: 'loginPasswordNotEmpty'
  })
  password: string;
}

export class CreateUserDto {
  @IsNotEmpty({
    message: 'createUserAccountNotEmpty'
  })
  account: string;

  @IsNotEmpty({
    message: 'createUserPasswordNotEmpty'
  })
  password: string;

  @IsNotEmpty({
    message: 'createUserNameNotEmpty'
  })
  userName: string;

  @IsNotEmpty({
    message: 'createUserEmailNotEmpty'
  })
  email: string;
}