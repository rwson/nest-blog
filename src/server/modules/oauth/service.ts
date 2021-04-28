import { Injectable, CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { stringifyUrl, stringify } from 'query-string';
import { Cache } from 'cache-manager';
import { v4 } from 'uuid';

import { AuthService } from '@/server/auth';
import ProxyRequest from '@/server/utils/proxy-request';
import { UnionModelToken, UnionModel, UnionInterface } from '@/server/models';
import { UnionDocument } from '@/server/models/union';

import { GitHubTokenResponse, GitHubUserInfoResponse, UnionLoginResponse, OAuthLoginResponse, OAuthLoginData, GoogleTokenResponse } from '@/dto/oauth/response';

import { GITHUB_INFO, GOOGLE_INFO } from '@/server/config';

import errorCode from '@/error-code';

@Injectable()
export class OAuthService {
  constructor(
    private readonly authService: AuthService,
    private readonly proxyRequest: ProxyRequest,
    @Inject(UnionModelToken) private readonly unionModel: UnionInterface,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
  }

  async githubCallback(code: string, state: string, ip: string): Promise<UnionLoginResponse> {
    const tokenRes = await this.proxyRequest.requestApi<GitHubTokenResponse>({
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

    if (tokenRes.access_token) {
      const { access_token: accessToken } = tokenRes;
      const infoRes = await this.proxyRequest.requestApi<GitHubUserInfoResponse>({
        url: GITHUB_INFO.userApi,
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `token ${accessToken}`
        }
      });

      if (infoRes) {
        const { name, avatar_url, bio, blog } = infoRes;
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

  async googleCallback(code: string, ip: string): Promise<UnionLoginResponse> {
    const tokenRes = await this.proxyRequest.requestApi<GoogleTokenResponse>({
      method: 'POST',
      url: GOOGLE_INFO.tokenUrl,
      body: stringify({
        code,
        client_id: GOOGLE_INFO.id,
        client_secret: GOOGLE_INFO.secret,
        redirect_uri: GOOGLE_INFO.redirect,
        grant_type: 'authorization_code'
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (tokenRes.error) {
      return {
        success: false
      };
    }

    const infoRes = await this.proxyRequest.requestApi({
      method: 'GET',
      url: GOOGLE_INFO.userInfoUrl,
      headers: {
        authorization: `Bearer ${tokenRes.access_token}`
      }
    });

    if (infoRes) {
      const { given_name, picture, bio = '', blog = '' } = infoRes;
      const uuid: string = v4();
      const unionUserInst: UnionDocument = new UnionModel({
        loginType: 'google',
        nickName: given_name,
        avatar: picture,
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

  googleAuth(): string {
    const query = {
      response_type: 'code',
      client_id: GOOGLE_INFO.id,
      redirect_uri: GOOGLE_INFO.redirect,
      scope: GOOGLE_INFO.scope
    };

    return stringifyUrl({
      url: GOOGLE_INFO.authBase,
      query
    });
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
