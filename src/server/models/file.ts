import { Schema } from 'mongoose';

import * as moment from 'moment';

import formatId from '@/server/mongoose/format-id';

import BaseDocument from './base-document';

const schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    originalname: {
      type: Schema.Types.String,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      required: true,
    },
    distPath: {
      type: Schema.Types.String,
      required: true,
    },
    size: {
      type: Schema.Types.Number,
      required: true,
    },
    url: {
      type: Schema.Types.String,
      required: true,
    },
    md5: {
      type: Schema.Types.String,
      required: true,
    },
    uploader: {
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

const FileSchema = formatId<SchemaType>(schema);

export interface FileDocument extends BaseDocument {
  readonly name: string;
  readonly type: 'image' | 'video' | 'audio' | 'document' | 'other';
  readonly size: number;
  readonly url: string;
}

export default FileSchema;
