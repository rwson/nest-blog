import {
  Controller,
  Get,
  Query,
  Inject,
  Request,
  Response,
  HttpStatus,
  UseGuards,
  Headers,
  CACHE_MANAGER
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express';
import { stringifyUrl } from 'query-string';
import { Cache } from 'cache-manager';
import { v4 } from 'uuid';
import * as userIp from 'user-ip';

import { OAUTH_REQUEST_CACHE_KEY, GITHUB_INFO } from '@/server/config';
import { OAuthLoginResponse } from '@/dto/oauth/response';
import { OAuthService } from './service';

@Controller('/oauth')
export class OAuthController {
  constructor(
    private readonly oAuthService: OAuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get('/github')
  githubAuth(@Query('redirect') redirect: string, @Response() res: express.Response): void {
    const state: string = v4();
    this.cacheManager.set(OAUTH_REQUEST_CACHE_KEY, redirect);
    res.status(HttpStatus.PERMANENT_REDIRECT).redirect(
      stringifyUrl({
        url: GITHUB_INFO.authUrl,
        query: {
          state
        }
      }));
  }

  @Get('/google')
  googleAuth(@Query('redirect') redirect: string, @Response() res: express.Response): void {
    this.cacheManager.set(OAUTH_REQUEST_CACHE_KEY, redirect);
    const url: string = this.oAuthService.googleAuth();
    res.status(HttpStatus.PERMANENT_REDIRECT).redirect(url);
  }

  @Get('/github-callback')
  async githubCallback(@Query('code') code: string, @Query('state') state: string, @Request() req: express.Request, @Response() res: express.Response): Promise<void> {
    const redirect: string = await this.cacheManager.get(OAUTH_REQUEST_CACHE_KEY);
    const ip: string = userIp(req);
    const result = await this.oAuthService.githubCallback(code, state, ip);

    if (result.success) {
      res.status(HttpStatus.PERMANENT_REDIRECT).redirect(stringifyUrl({
        url: redirect,
        query: {
          uuid: result.uuid,
          token: result.token
        }
      }));
    }
  }

  @Get('/google-callback')
  async googleCallback(@Query('code') code: string, @Request() req: express.Request, @Response() res: express.Response): Promise<void> {
    const redirect: string = await this.cacheManager.get(OAUTH_REQUEST_CACHE_KEY);
    const ip: string = userIp(req);
    const result = await this.oAuthService.googleCallback(code, ip);

    if (result.success) {
      res.status(HttpStatus.PERMANENT_REDIRECT).redirect(stringifyUrl({
        url: redirect,
        query: {
          uuid: result.uuid,
          token: result.token
        }
      }));
    }
  }

  @Get('/info')
  @UseGuards(AuthGuard())
  async getInfo(@Headers('authorization') authorization: string): Promise<OAuthLoginResponse> {
    return this.oAuthService.getInfo(authorization);
  }
}


// http://localhost:3001/oauth/google?redirect=http%3A%2F%2Flocalhost%3A3002%2Fblog%2F607416ed0f09ac97bd3683d7