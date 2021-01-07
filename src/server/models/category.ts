import { Schema } from 'mongoose';

import * as moment from 'moment';

import formatId from '@/server/mongoose/format-id';

import BaseDocument from './base-document';

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    createdAt: {
      type: Schema.Types.String,
      default: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    updatedAt: {
      type: Schema.Types.String,
      default: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
).index({
  createdAt: -1,
});

type SchemaType = typeof schema;

const CategorySchema = formatId<SchemaType>(schema);
export interface CategoryDocument extends BaseDocument {
  readonly title: string;
}

export default CategorySchema;
