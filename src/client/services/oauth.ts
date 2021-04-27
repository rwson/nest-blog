import { oauth } from '@/client/api';
import Http, { HttpResponse } from '@/client/http';

import { OAuthLoginData } from '@/dto/oauth/response';

export type GetUserInfoHeader = {
  authorization: string;
};

interface OAuthInterface {
  getUserInfo(header: GetUserInfoHeader): Promise<HttpResponse<OAuthLoginData>>;
};

class OAuthService implements OAuthInterface {
  getUserInfo(header: GetUserInfoHeader): Promise<HttpResponse<OAuthLoginData>> {
    return Http.get<any>(oauth.userInfo, {}, header);
  }
}

export default new OAuthService;

