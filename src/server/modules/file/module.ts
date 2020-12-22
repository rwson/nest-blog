import { Module } from '@nestjs/common';

import { FileModelProvider } from '@/server/models';

import { AuthService, JwtStrategy, injectModules } from '@/server/auth';

import { FileController } from './controller';
import { FileService } from './service';

@Module({
  imports: [...injectModules],
  controllers: [FileController],
  providers: [FileModelProvider, FileService, AuthService, JwtStrategy],
})
export class FileModule {}
