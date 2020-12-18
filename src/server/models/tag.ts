import { Schema } from 'mongoose';

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
      default: dayjs().format('YYYY-MM-DD HH:mm:ss')
    },
    updatedAt: {
      type: Schema.Types.String,
      default: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    versionKey: false,
    timestamps: { 
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
).index({ 
  createdAt: -1
});

const TagSchema = formatId<SchemaType>(schema);

type SchemaType = typeof schema;

export interface TagDocument extends BaseDocument {
  readonly title: string;
}

export default TagSchema;
