import { Schema } from 'mongoose';

import * as moment from 'moment';

import formatId from '@/server/mongoose/format-id';

import BaseDocument from './base-document';

const schema = new Schema(
  {
    loginType: {
      type: Schema.Types.String,
      enum: ['github', 'google', 'guest'],
      default: 'guest'
    },
    nickName: {
      type: Schema.Types.String,
      required: true
    },
    avatar: {
      type: Schema.Types.String,
      required: true
    },
    uuid: {
      type: Schema.Types.String,
      required: true
    },
    lastLoginIp: {
      type: Schema.Types.String
    },
    bio: {
      type: Schema.Types.String
    },
    blog: {
      type: Schema.Types.String
    },
    lastLoginTime: {
      type: Schema.Types.Date,
      default: Date.now()
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

const UnionSchema = formatId<SchemaType>(schema);

type SchemaType = typeof schema;

export interface UnionDocument extends BaseDocument {
  readonly loginType: string;
  readonly nickName: string;
  readonly avatar: string;
  readonly uuid: string;
  readonly lastLoginIp: string;
  readonly bio: string;
  readonly blog: string;
  readonly lastLoginTime: number;
}

export default UnionSchema;
