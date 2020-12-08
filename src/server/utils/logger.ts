import { join } from 'path';
import * as log4js from 'log4js';
import { isDev, PATHS } from '@/server/config';

log4js.addLayout('json', (config) => {
  return (logEvent) => {
    return JSON.stringify(logEvent) + config.separator;
  };
});

log4js.configure({
  appenders: {
    console: { type: 'console' },
    requestInfoFile: {
      type: 'file',
      filename: join(PATHS.logPath, 'request-info.log'),
      maxLogSize: 3 * 1024 * 1024,
      backups: 3,
      compress: true,
      layout: { type: 'json', separator: ',' },
    },
    infoFile: {
      type: 'file',
      filename: join(PATHS.logPath, 'info.log'),
      maxLogSize: 1024 * 1024,
      backups: 3,
      compress: true,
      layout: { type: 'json', separator: ',' },
    },
    errorFile: {
      type: 'file',
      filename: join(PATHS.logPath, 'error.log'),
      maxLogSize: 1024 * 1024,
      backups: 3,
      compress: true,
      layout: { type: 'json', separator: ',' },
    },
  },
  categories: {
    info: { appenders: ['infoFile'], level: 'info' },
    error: { appenders: ['errorFile'], level: 'error' },
    requestInfo: { appenders: ['requestInfoFile'], level: 'info' },
    default: { appenders: ['console'], level: 'debug' }
  }
});

const consoleLogger = log4js.getLogger();

export const requestInfoLogger = isDev
  ? consoleLogger
  : log4js.getLogger('requestInfo');

const infoLogger = isDev ? consoleLogger : log4js.getLogger('info');

const errorLogger = isDev ? consoleLogger : log4js.getLogger('error');

if (!isDev) {
  Object.assign(infoLogger, {
    error: (message: any, ...args: any[]): void => {
      errorLogger.error(message, args);
    },
  });
}
export default infoLogger;
