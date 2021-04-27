import { Injectable, CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { stringifyUrl } from 'query-string';
import { Cache } from 'cache-manager';
import { v4 } from 'uuid';

import { AuthService } from '@/server/auth';
import { UnionModelToken, UnionModel, UnionInterface } from '@/server/models';
import { UnionDocument } from '@/server/models/union';

import { GitHubTokenResponse, GitHubUserInfoResponse, GitHubUnionLoginResponse, OAuthLoginResponse, OAuthLoginData } from '@/dto/oauth/response';

import { GITHUB_INFO } from '@/server/config';

import errorCode from '@/error-code';

@Injectable()
export class OAuthService {
  constructor(
    private readonly authService: AuthService,
    @Inject(UnionModelToken) private readonly unionModel: UnionInterface,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async githubCallback(code: string, state: string, ip: string): Promise<GitHubUnionLoginResponse> {
    const tokenRes: AxiosResponse<GitHubTokenResponse> = await axios({
      url: stringifyUrl({
        url: GITHUB_INFO.tokenApi,
        query: {
          client_id: GITHUB_INFO.id,
          client_secret: GITHUB_INFO.secret,
          code,
          state
        }
      }),
      method: 'POST',
      headers: {
        accept: 'application/json'
      }
    });

    if (tokenRes.data.access_token) {
      const { access_token: accessToken } = tokenRes.data;
      const infoRes: AxiosResponse<GitHubUserInfoResponse> = await axios({
        url: GITHUB_INFO.userApi,
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `token ${accessToken}`
        }
      });

      if (infoRes.data) {
        const { name, avatar_url, bio, blog } = infoRes.data;
        const uuid: string = v4();
        const unionUserInst: UnionDocument = new UnionModel({
          loginType: 'github',
          nickName: name,
          avatar: avatar_url,
          lastLoginIp: ip,
          lastLoginTime: Date.now(),
          bio,
          blog,
          uuid
        });

        await unionUserInst.save();
        const token = this.authService.signIn(unionUserInst.id, uuid, 'github', null);
        return {
          success: true,
          token,
          uuid
        };
      }
    }

    return {
      success: false
    };
  }

  async getInfo(authorization: string): Promise<OAuthLoginResponse> {
    const user = this.authService.parse(authorization);
    const id: string = user.id ?? '';
    const userDoc: UnionDocument | null = await this.unionModel.findById(id);

    if (userDoc !== null) {
      const oAuthData = new OAuthLoginData();
      oAuthData.loginType = userDoc.loginType;
      oAuthData.nickName = userDoc.nickName;
      oAuthData.avatar = userDoc.avatar;
      oAuthData.uuid = userDoc.uuid;
      oAuthData.bio = userDoc.bio;
      oAuthData.blog = userDoc.blog;
      oAuthData.token = this.authService.signIn(userDoc.id, userDoc.uuid, userDoc.loginType, authorization);

      return {
        ...errorCode.success,
        data: oAuthData
      };
    }

    throw new UnauthorizedException(errorCode.oAuthTokenNotExist);
  }

  
}
