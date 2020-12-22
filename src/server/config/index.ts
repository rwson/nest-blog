import * as pathConfig from './path';

import * as errorCode from './error-code';

export const isDev: boolean = process.env.NODE_ENV === 'development';

export const MONGODB = {
  uri: 'mongodb://localhost:27017/blog?retryWrites=false',
  token: 'db_model_token',
};

export const BLOG_JWT_KEY = 'blog_jwt_key';

export const BLOG_JWT_EXP = isDev
  ? 30 * 24 * 60 * 60 * 1000
  : 30 * 24 * 60 * 60;

export const BODY_PARSER_MAX = '50mb';

export const PATHS = pathConfig;

export const ERROR_CODE = errorCode;
