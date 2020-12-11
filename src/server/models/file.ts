import { Schema } from 'mongoose';

import * as dayjs from 'dayjs';

import formatId from '@/server/mongoose/format-id';

import BaseDocument from './base-document';

const schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      enum: ['image', 'video', 'audio', 'document', 'other'],
      required: true,
    },
    size: {
      type: Schema.Types.Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    uploader: {
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
  },
).index({ 
  createdAt: -1
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
