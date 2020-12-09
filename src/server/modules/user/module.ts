import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModelProvider } from '@/server/models';

import { AuthService, JwtStrategy } from '@/server/auth';


import { BLOG_JWT_KEY, BLOG_JWT_EXP } from '@/server/config';

import { UserController } from './controller';
import { UserService } from './service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: BLOG_JWT_KEY,
      signOptions: {
        expiresIn: BLOG_JWT_EXP
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService, UserModelProvider, AuthService, JwtStrategy],
})
export class UserModule {}
