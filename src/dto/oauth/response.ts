import { BaseResponse } from '../base';

export type GitHubTokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
};

export type GitHubUserInfoResponse = {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
  company: string;
  blog: string;
};

export type GoogleTokenResponse = Partial<{
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
  error: string;
}>;

export class UnionLoginResponse {
  token?: string;
  uuid?: string;
  success: boolean;
}

export class OAuthLoginData {
  loginType: string;
  nickName: string;
  avatar: string;
  uuid: string;
  bio: string;
  blog: string;
  token: string;
}

export class OAuthLoginResponse extends BaseResponse {
  data?: OAuthLoginData;
}