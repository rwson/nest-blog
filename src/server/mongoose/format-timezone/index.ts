import mongoose from 'mongoose';
import dayjs from 'dayjs';

const formatTimeZone = <T>(schema: mongoose.Schema<T>, columns: Array<any>): mongoose.Schema<T> => {
  for (const column of columns) {
    schema.path(column).get((value: string) => {
      const date: dayjs.Dayjs = dayjs(value);
      date.add(8, 'hour');

      return date.format('YYYY-MM-DD HH:mm:ss');
    });
  }

  schema.set('toObject', { 
    getters: true
  });

  return schema;
};

export default formatTimeZone;

