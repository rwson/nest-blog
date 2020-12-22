import { Schema } from 'mongoose';

import * as dayjs from 'dayjs';

import formatId from '@/server/mongoose/format-id';

import BaseDocument from './base-document';

const schema = new Schema(
  {
    type: {
      type: Schema.Types.String,
      enum: ['admin'],
      default: 'admin',
      required: true,
    },
    avatar: {
      type: Schema.Types.String,
      required: false,
    },
    userName: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    account: {
      type: Schema.Types.String,
      required: true,
    },
    // 密码
    password: {
      type: Schema.Types.String,
      required: true,
    },
    createdAt: {
      type: Schema.Types.String,
      default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
    updatedAt: {
      type: Schema.Types.String,
      default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
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

const UserSchema = formatId<SchemaType>(schema);

export interface UserDocument extends BaseDocument {
  readonly type: 'admin';
  readonly avatar: string;
  readonly userName: string;
  readonly email: string;
  readonly account: string;
  readonly password: string;
}

export default UserSchema;
