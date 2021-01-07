import { Schema } from 'mongoose';

import * as moment from 'moment';

import paginate from '@/server/mongoose/paginate';

import formatId from '@/server/mongoose/format-id';

import BaseDocument from './base-document';

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
    source: {
      type: Schema.Types.String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: false,
    },
    isDraft: {
      type: Schema.Types.Boolean,
      required: false,
      default: false,
    },
    isDeleted: {
      type: Schema.Types.Boolean,
      required: false,
      default: false,
    },
    commentCount: {
      type: Schema.Types.Number,
      required: false,
      default: 0,
    },
    viewsCount: {
      type: Schema.Types.Number,
      required: false,
      default: 0,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'tag',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comment',
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    publishDate: {
      type: Schema.Types.String,
      default: moment().format('YYYY-MM-DD'),
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

const ArticleSchema = formatId<SchemaType>(schema);

export interface ArticleDocument extends BaseDocument {
  readonly title: string;
  readonly content: string;
  readonly category: string;
  readonly isDraft: boolean;
  readonly isDeleted: boolean;
  readonly commentCount: number;
  readonly viewsCount: number;
  readonly tags: Array<string>;
  readonly comments: Array<string>;
}

export default ArticleSchema;
