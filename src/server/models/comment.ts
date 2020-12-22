import { Schema } from 'mongoose';

import * as dayjs from 'dayjs';

import formatId from '@/server/mongoose/format-id';
import autoPopulateSubs from '@/server/mongoose/auto-populate-subs';

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
    reply: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comment'
      }
    ],
    article: {
      type: Schema.Types.ObjectId,
      ref: 'article',
      required: true
    },
    // 管理员身份为1，0为游客
    identity: {
      type: Schema.Types.Number,
      enum: [1, 0],
      default: 0
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

type SchemaType = typeof schema;

const CommentSchema = autoPopulateSubs<SchemaType>(formatId<SchemaType>(schema), ['find', 'findOne'], 'reply', 'id nickName email website article content reply createdAt');

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
