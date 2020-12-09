import { APP_GUARD } from '@nestjs/core';

import RolesGuard from './guard';
import Roles from './auth';

export const GuardProvider = {
  provide: APP_GUARD,
  useClass: RolesGuard
}

export { RolesGuard, Roles };
