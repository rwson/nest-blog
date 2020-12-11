import mongoose from 'mongoose';

const formatId = <T>(schema: mongoose.Schema<T>): mongoose.Schema<T> => {
  schema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  schema.set('toJSON', {
    virtuals: true
  });

  return schema;
};

export default formatId;

