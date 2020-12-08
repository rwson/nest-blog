import { Module, DynamicModule } from '@nestjs/common';

import { SSRController, app } from './controller';

@Module({
  controllers: [SSRController],
})
export class SSRModule {
  static forRoot(): Promise<DynamicModule> {
    return app.prepare().then(() => {
      return {
        module: SSRModule,
      };
    });
  }
}
