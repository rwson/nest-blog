import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as log4js from 'log4js';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { requestInfoLogger } from './utils/logger';

import { PATHS } from '@/server/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.static(PATHS.assetsPath));
  app.use(express.static(PATHS.staticAssetsPath));

  app.enableCors();

  app.use(log4js.connectLogger(requestInfoLogger, { level: 'info' }));
  // app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3003);
}
bootstrap();
