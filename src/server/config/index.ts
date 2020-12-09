import * as pathConfig from './path';

import * as errorCode from './error-code';

export const isDev: boolean = process.env.NODE_ENV === 'development';

export const MONGODB = {
  uri: 'mongodb://localhost:27017/blog',
  token: 'db_model_token'
};

export const BLOG_JWT_KEY = 'blog_jwt_key';

export const BLOG_JWT_EXP = isDev ? Number.MIN_SAFE_INTEGER : 30 * 24 * 60 * 60;

export const PATHS = pathConfig;

export const ERROR_CODE = errorCode;

