import { Module } from '@nestjs/common';

import { UserModelProvider } from '@/server/models';

import { UserController } from './controller';
import { UserService } from './service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserModelProvider, UserService],
})
export class UserModule {}
