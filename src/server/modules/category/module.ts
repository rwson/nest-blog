import { Module } from '@nestjs/common';

import { CategoryModelProvider } from '@/server/models';

import { AuthService, JwtStrategy, injectModules } from '@/server/auth';

import { CategoryController } from './controller';
import { CategoryService } from './service';

@Module({
  imports: [
    ...injectModules
  ],
  controllers: [CategoryController],
  providers: [CategoryModelProvider, CategoryService, AuthService, JwtStrategy]
})
export class CategoryModule {}
