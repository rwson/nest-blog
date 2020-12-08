import * as pathConfig from './path';

import * as errorCode from './error-code';

export const isDev: boolean = process.env.NODE_ENV === 'development';

export const MONGODB = {
  uri: 'mongodb://localhost:27017/blog',
  token: 'db_model_token'
};

export const PATHS = pathConfig;

export const ERROR_CODE = errorCode;

