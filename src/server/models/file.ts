import { Schema } from 'mongoose';

import formatTimeZone from '@/server/mongoose/format-timezone';

import BaseDocument from './base-document';

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['image', 'video', 'audio', 'document', 'other'],
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
).index({ 
  createdAt: -1
});

type SchemaType = typeof schema;

const FileSchema = formatTimeZone<SchemaType>(schema, ['createdAt', 'updatedAt']);

export interface FileDocument extends BaseDocument {
  readonly name: string;
  readonly type: 'image' | 'video' | 'audio' | 'document' | 'other';
  readonly size: number;
  readonly url: string;
}

export default FileSchema;
