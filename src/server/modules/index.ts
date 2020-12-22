import { ArticleModule } from './article/module';
import { CategoryModule } from './category/module';
import { CommentModule } from './comment/module';
import { FileModule } from './file/module';
import { TagModule } from './tag/module';
import { UserModule } from './user/module';

import { SSRModule as SSR } from './ssr/module';

export default [
  ArticleModule,
  CategoryModule,
  CommentModule,
  FileModule,
  TagModule,
  UserModule,
];

export const SSRModule = SSR;
