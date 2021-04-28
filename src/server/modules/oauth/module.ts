import { Module, CacheModule } from '@nestjs/common';
import { UnionModelProvider } from '@/server/models';
import { AuthService, JwtStrategy, injectModules } from '@/server/auth';
import ProxyRequest from '@/server/utils/proxy-request';

import { OAuthController } from './controller';
import { OAuthService } from './service';

@Module({
  imports: [CacheModule.register({
    ttl: 100,
    max: 50
  }), ...injectModules],
  controllers: [OAuthController],
  providers: [UnionModelProvider, OAuthService, AuthService, ProxyRequest, JwtStrategy],
})
export class OAuthModule {}
