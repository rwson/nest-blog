import mongoose from 'mongoose';

const formatId = <T>(schema: mongoose.Schema<T>): mongoose.Schema<T> => {
  schema.set('toJSON', {
    transform: function (doc, ret, options) {
      if (ret._id) {
        ret.id = ret._id;
        delete ret._id;
      }
    },
  });

  return schema;
};

export default formatId;
