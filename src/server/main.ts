import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as log4js from 'log4js';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { ApiValidationPipe } from './pipe/validator';
import { requestInfoLogger } from './utils/logger';

import { PATHS, BODY_PARSER_MAX } from '@/server/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.static(PATHS.assetsPath));
  app.use(express.static(PATHS.staticAssetsPath));

  app.enableCors();

  app.use(
    bodyParser.urlencoded({
      limit: BODY_PARSER_MAX,
      extended: true,
    }),
  );
  app.use(log4js.connectLogger(requestInfoLogger, { level: 'info' }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ApiValidationPipe());

  await app.listen(3001);
}
bootstrap();
