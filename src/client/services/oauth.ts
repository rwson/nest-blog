import { oauth } from '@/client/api';
import Http, { HttpResponse } from '@/client/http';

import { ArticleDetailData } from '@/dto/article/response';

export type GetUserInfoHeader = {
  authorization: string;
};

interface OAuthInterface {
  getUserInfo(header: GetUserInfoHeader): Promise<HttpResponse<any>>;
};

class OAuthService implements OAuthInterface {
  getUserInfo(header: GetUserInfoHeader): Promise<HttpResponse<any>> {
    return Http.get<any>(oauth.userInfo, {}, header);
  }
}

export default new OAuthService;

