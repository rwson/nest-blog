import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import * as mongoose from 'mongoose';

import { format } from 'util';

import logger from '@/server/utils/logger';

import errorCode from '@/error-code';

type ExceptionResponseType = {
  code: number;
  message: string;
};

const isString = (str: unknown) =>
  Object.prototype.toString.call(str) === '[object String]';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    if (exception instanceof mongoose.Error) {
      logger.warn(exception.message);
      return response.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: exception.message,
      });
    }

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse: ExceptionResponseType = exception.getResponse() as ExceptionResponseType;
      const code: number = exceptionResponse.code ?? status;
      const message: string = (isString(exceptionResponse)
        ? exceptionResponse
        : exceptionResponse.message) as string;

      if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        logger.error('internal server request error.', exception);
      } else {
        logger.error(
          format(
            'api: %s response code: %d, message: %s',
            request.path,
            code,
            message,
          ),
        );
      }

      if (status === HttpStatus.UNAUTHORIZED) {
        return response.status(status).json(errorCode.unauthorized);
      }

      return response.status(status).json({
        code,
        message,
      });
    }

    logger.error('unknown error.', exception);

    return response.status(status).json({
      code: status,
      message: '服务器罢工了，请稍后再重试',
    });
  }
}
