import { Module } from '@nestjs/common';

import { UserModelProvider } from '@/server/models';

import { AuthService, JwtStrategy, injectModules } from '@/server/auth';

import { UserController } from './controller';
import { UserService } from './service';

@Module({
  imports: [
    ...injectModules
  ],
  controllers: [UserController],
  providers: [UserService, UserModelProvider, AuthService, JwtStrategy],
})
export class UserModule {}
