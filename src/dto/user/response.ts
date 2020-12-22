import { BaseResponse } from '../base';

export class UserLoginData {
  token: string;
  email: string;
  userName: string;
  avatar: string;
  type: string;
}

export class UserLoginResponse extends BaseResponse {
  data?: UserLoginData;
}

export class CreateUserResponse extends BaseResponse {}
