import { Injectable, Inject } from '@nestjs/common';

import { PATHS } from '@/server/config';

@Injectable()
export class FileService {
  getHello(): string {
    return 'Hello World!3333377';
  }
}
