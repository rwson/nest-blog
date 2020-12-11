import { Schema } from 'mongoose';

import * as dayjs from 'dayjs';

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
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
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
      type: Number,
      required: false,
      default: 0,
    },
    viewsCount: {
      type: Number,
      required: false,
      default: 0,
    },
    tags: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: 'tag',
      default: [],
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: 'comment',
      required: false,
      default: [],
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
