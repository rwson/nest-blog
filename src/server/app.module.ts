import { Module } from '@nestjs/common';

import DatabaseModule from './mongoose/module';

import Modules from './modules';

@Module({
  imports: [
    DatabaseModule,
    ...Modules,
    // SSRModule.forRoot()
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
