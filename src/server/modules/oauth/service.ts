import { Injectable, CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { OAuth2Client } from 'google-auth-library';
import { stringifyUrl, stringify } from 'query-string';
import { Cache } from 'cache-manager';
import { v4 } from 'uuid';

import { AuthService } from '@/server/auth';
import { UnionModelToken, UnionModel, UnionInterface } from '@/server/models';
import { UnionDocument } from '@/server/models/union';

import { GitHubTokenResponse, GitHubUserInfoResponse, UnionLoginResponse, OAuthLoginResponse, OAuthLoginData, GoogleTokenResponse } from '@/dto/oauth/response';

import { GITHUB_INFO, GOOGLE_INFO } from '@/server/config';

import errorCode from '@/error-code';

@Injectable()
export class OAuthService {
  constructor(
    private readonly authService: AuthService,
    @Inject(UnionModelToken) private readonly unionModel: UnionInterface,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  private readonly oAuth2Client: OAuth2Client = new OAuth2Client({
    clientId: GOOGLE_INFO.id,
    clientSecret: GOOGLE_INFO.secret,
    redirectUri: GOOGLE_INFO.redirect,
  });

  async githubCallback(code: string, state: string, ip: string): Promise<UnionLoginResponse> {
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

  async googleCallback(code: string, ip: string): Promise<UnionLoginResponse> {
    const tokenBody = {
      code,
      client_id: GOOGLE_INFO.id,
      client_secret: GOOGLE_INFO.secret,
      redirect_uri: GOOGLE_INFO.redirect,
      grant_type: 'authorization_code'
    };
    const tokenRes: AxiosResponse<GoogleTokenResponse> = await axios({
      method: 'POST',
      url: GOOGLE_INFO.tokenUrl,
      data: stringify(tokenBody),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (tokenRes.data.error) {
      return {
        success: false
      };
    }

    console.log(tokenRes.data.access_token);

    try {
      const tokenInfoRes = await axios({
        method: 'GET',
        url: GOOGLE_INFO.userInfoUrl,
        headers: {
          authorization: `Bearer ${tokenRes.data.access_token}`
        }
      });

      console.log(tokenInfoRes.data);
    } catch(e) {
      console.log(e)
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
