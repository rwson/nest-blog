import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { BLOG_JWT_KEY, BLOG_JWT_EXP } from '@/server/config';

import { AuthService } from './service'
import { JwtStrategy } from './strategy'

const injectModules = [
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: BLOG_JWT_KEY,
    signOptions: {
      expiresIn: BLOG_JWT_EXP
    }
  })
];

export { 
  AuthService,
  JwtStrategy,
  injectModules
};
