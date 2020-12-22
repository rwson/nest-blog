import * as mongoose from 'mongoose';
import { Module, Global } from '@nestjs/common';
import { MONGODB, isDev } from '@/server/config';

const MONGODB_CONNECTION_TOKEN = Symbol('MONGODB_CONNECTION_TOKEN');

const Connection = {
  provide: MONGODB_CONNECTION_TOKEN,
  useFactory: () => {
    const RECONNET_INTERVAL = 500;

    if (!isDev) {
      mongoose.connection.on('connecting', () => {
        console.log('数据库连接中...');
      });

      mongoose.connection.on('open', () => {
        console.info('数据库连接成功！');
      });

      mongoose.connection.on('disconnected', () => {
        console.error(
          `数据库失去连接！尝试 ${RECONNET_INTERVAL / 1000}s 后重连`,
        );
      });

      mongoose.connection.on('error', (error) => {
        console.error('数据库发生异常！', error);
        mongoose.disconnect();
        process.exit(99);
      });
    }

    const client = mongoose.connect(MONGODB.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    return client;
  },
};

@Global()
@Module({
  providers: [Connection],
})
export default class DatabaseModule {}
