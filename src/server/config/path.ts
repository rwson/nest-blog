import { join } from 'path';

import * as moment from 'moment';

export const rootPath: string = process.cwd();

/**
 * 日志文件路径
 */
export const logPath: string = join(rootPath, 'logs');

/**
 * public目录路径
 */
export const publicPath: string = join(rootPath, 'public');

/**
 * assets静态资源路径
 */
export const assetsPath: string = join(rootPath, 'public/assets');

/**
 * 静态资源路径
 */
export const staticAssetsPath: string = join(rootPath, 'public/static');

/**
 * 上传文件存放目录路径
 */
export const uploadRootPath: string = join(publicPath, 'static/upload');

/**
 *  获取带日期的上传路径
 */
export const getUploadPathWithDate = (): string => {
  const date: string = moment().format('YYYY-MM-DD');
  return join(uploadRootPath, date);
};

export const getVisitPath = (name: string): string => {
  const date: string = moment().format('YYYY-MM-DD');
  return join(`/upload/${date}`, name);
};
