import * as mongoose from 'mongoose';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import logger from '@/server/utils/logger';

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
    const response = ctx.getResponse();

    if (exception instanceof mongoose.Error) {
      logger.warn(exception.message);
      return response.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: exception.message,
      });
    }

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse: ExceptionResponseType = exception.getResponse() as ExceptionResponseType;

      if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        logger.error('internal server request error.', exception);
      }
      return response.status(status).json({
        code: exceptionResponse.code ?? status,
        message: isString(exceptionResponse)
          ? exceptionResponse
          : exceptionResponse.message,
      });
    }

    logger.error('unknown error.', exception);

    return response.status(status).json({
      code: status,
      message: '服务器罢工了，请稍后再重试',
    });
  }
}
