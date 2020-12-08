import { Module } from '@nestjs/common';
import { FileController } from './controller';
import { FileService } from './service';

@Module({
  imports: [],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
