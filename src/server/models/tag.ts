import { Schema } from 'mongoose';

import mongoosePaginate from 'mongoose-paginate';

import * as dayjs from 'dayjs';

import paginate from '@/server/mongoose/paginate';

import formatId from '@/server/mongoose/format-id';

import BaseDocument from './base-document';

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true
    },
    color: {
      type: Schema.Types.String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    createdAt: {
      type: Schema.Types.String,
      set() {
        return dayjs().format('YYYY-MM-DD HH:mm:ss');
      }
    },
    updatedAt: {
      type: Schema.Types.String,
      set() {
        return dayjs().format('YYYY-MM-DD HH:mm:ss');
      }
    }
  },
  {
    versionKey: false
  }
).index({ 
  createdAt: -1
});

schema.plugin(mongoosePaginate);

const TagSchema = formatId<SchemaType>(schema);

type SchemaType = typeof schema;

export interface TagDocument extends BaseDocument {
  readonly title: string;
}

export default TagSchema;
