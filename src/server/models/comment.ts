import { Schema } from 'mongoose';

import * as moment from 'moment';

import formatId from '@/server/mongoose/format-id';
import autoPopulateSubs from '@/server/mongoose/auto-populate-subs';

import BaseDocument from './base-document';

const schema = new Schema(
  {
    commentor: {
      type: Schema.Types.ObjectId,
      ref: 'union'
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
    isReply: {
      type: Schema.Types.Boolean,
      required: false,
      default: false,
    },
    reply: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comment',
      },
    ],
    article: {
      type: Schema.Types.ObjectId,
      ref: 'article',
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'union'
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'union'
      }
    ],
    identity: {
      type: Schema.Types.Number,
      enum: [1, 0],
      default: 0,
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

const CommentSchema = autoPopulateSubs<SchemaType>(
  formatId<SchemaType>(schema),
  ['find', 'findOne'],
  'reply',
  'id commentor likes dislikes article content reply createdAt',
);

export interface CommentDocument extends BaseDocument {
  readonly commentor: string;
  readonly reply: Array<CommentDocument>;
  readonly article: string;
  readonly likes: Array<String>;
  readonly dislikes: Array<String>;
  readonly pass: boolean;
  readonly identity: 0 | 1;
}

export default CommentSchema;
