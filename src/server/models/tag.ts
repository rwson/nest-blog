import { Schema } from 'mongoose';

import formatTimeZone from '@/server/mongoose/format-timezone';

import BaseDocument from './base-document';

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true
    }
  },
  {
    timestamps: true
  }
).index({ 
  createdAt: -1
});

type SchemaType = typeof schema;

const TagSchema = formatTimeZone<SchemaType>(schema, ['createdAt', 'updatedAt']);

export interface TagDocument extends BaseDocument {
  readonly title: string;
}

export default TagSchema;
