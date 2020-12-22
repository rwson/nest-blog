import mongoose from 'mongoose';

const autoPopulateSubs = <T>(
  schema: mongoose.Schema<T>,
  methods: Array<string>,
  path: string,
  select: string,
): mongoose.Schema<T> => {
  methods.forEach((method: string) => {
    schema.pre(method, function (next) {
      const ctx = this as any;
      ctx.populate({
        path,
        select,
      });
      next();
    });
  });

  return schema;
};

export default autoPopulateSubs;
