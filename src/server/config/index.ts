import * as pathConfig from './path';

import * as errorCode from './error-code';

export const isDev: boolean = process.env.NODE_ENV === 'development';

export const MONGODB = {
  uri: 'mongodb://47.105.45.237:27017/blog',
  token: 'db_model_token',
};

export const BLOG_JWT_KEY = 'blog_jwt_key';

export const BLOG_JWT_EXP = isDev
  ? 30 * 24 * 60 * 60 * 1000
  : 30 * 24 * 60 * 60;

export const BODY_PARSER_MAX = '50mb';

export const PATHS = pathConfig;

export const ERROR_CODE = errorCode;

export const OAUTH_REQUEST_CACHE_KEY = 'oauth_request_cache_key';

export const GITHUB_INFO = {
  id: '72f2a96d967d130a885c',
  secret: '3f7c3d31e2dd647b93c8ec7a25f54869ab05a6de',
  tokenApi: 'https://github.com/login/oauth/access_token',
  userApi: 'https://api.github.com/user',
  authUrl: ''
};

GITHUB_INFO.authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_INFO.id}&redirect_uri=${decodeURIComponent('http://localhost:3001/oauth/github-callback')}`;

