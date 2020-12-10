import { Schema } from 'mongoose';

import paginate from '@/server/mongoose/paginate';
import formatTimeZone from '@/server/mongoose/format-timezone';

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
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  },
).index({
  createdAt: -1,
});

type SchemaType = typeof schema;

const ArticleSchema = formatTimeZone<SchemaType>(schema, ['createdAt', 'updatedAt']);

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
