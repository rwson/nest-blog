import { join } from 'path';

export const rootPath = process.cwd();

/**
 * 日志文件路径
 */
export const logPath = join(rootPath, 'logs');

/**
 * public目录路径
 */
export const publicPath = join(rootPath, 'public');

/**
 * assets静态资源路径
 */
export const assetsPath = join(rootPath, 'public/assets');

/**
 * 静态资源路径
 */
export const staticAssetsPath = join(rootPath, 'public/static');

/**
 * 上传文件存放目录路径
 */
export const uploadRootPath = join(publicPath, 'static/upload');

/**
 *  获取带年份的上传路径如：** /upload/2019/
 */
export const getUploadPathWithYear = () => {
  return '/static/upload/' + new Date().getFullYear();
};
