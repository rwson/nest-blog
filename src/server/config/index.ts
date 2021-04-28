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

export const PROXY_API_GATEWAY = 'https://rwson-googleapi.rwson.workers.dev';

export const GITHUB_INFO = {
  id: '72f2a96d967d130a885c',
  secret: '3f7c3d31e2dd647b93c8ec7a25f54869ab05a6de',
  tokenApi: 'https://github.com/login/oauth/access_token',
  userApi: 'https://api.github.com/user',
  authUrl: ''
};

GITHUB_INFO.authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_INFO.id}&redirect_uri=${decodeURIComponent('http://localhost:3001/oauth/github-callback')}`;

export const GOOGLE_INFO = {
  id: '638237220636-j6n3na1bkcabb95sif8mga51jf55icob.apps.googleusercontent.com',
  secret: 'Qqh9SPhesCzesYRzFMp2mYxY',
  scope: 'https://www.googleapis.com/auth/userinfo.profile',
  redirect: 'http://localhost:3001/oauth/google-callback',
  authBase: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  userInfoUrl: 'https://www.googleapis.com/oauth2/v1/userinfo'
};

