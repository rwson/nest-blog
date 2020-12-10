import { Schema } from 'mongoose';

import formatTimeZone from '@/server/mongoose/format-timezone';

import BaseDocument from './base-document';

const schema = new Schema(
  {
    nickName: {
      type: Schema.Types.String,
      required: true
    },
    email: {
      type: Schema.Types.String,
      required: true
    },
    website: {
      type: Schema.Types.String,
      default: ''
    },
    content: {
      type: Schema.Types.String,
      required: true
    },
    reply: {
      type: Schema.Types.ObjectId,
      ref: 'comment',
      default: null
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: 'article',
      required: true
    },
    location: {
      type: String,
      default: ''
    },
    pass: {
      type: Schema.Types.Boolean,
      default: true
    },
    // 管理员身份为1，0为游客
    identity: {
      type: Schema.Types.Number,
      enum: [1, 0],
      default: 0    
    }
  },
  {
    timestamps: true
  }
).index({ 
  createdAt: -1
});

type SchemaType = typeof schema;

const CommentSchema = formatTimeZone<SchemaType>(schema, ['createdAt', 'updatedAt']);

export interface CommentDocument extends BaseDocument {
  readonly nickName: string;
  readonly email: string;
  readonly website: string;
  readonly content: string;
  readonly reply: string;
  readonly article: string;
  readonly location: string;
  readonly pass: boolean;
  readonly identity: 0 | 1;
}

export default CommentSchema;
