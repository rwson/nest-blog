import { Schema } from 'mongoose';

import BaseDocument from './base-document';

const CommentSchema = new Schema(
  {
    type: {
      type: Schema.Types.String,
      enum: ['admin'],
      default: 'admin',
      required: true
    },
    avatar: {
      type: Schema.Types.String,
      required: false
    },
    userName: {
      type: Schema.Types.String,
      required: true
    },
    email: {
      type: Schema.Types.String,
      required: true
    },
    account: {
      type: Schema.Types.String,
      required: true
    },
    // 密码
    password: {
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

export interface UserDocument extends BaseDocument {
  readonly type: 'admin';
  readonly avatar: string;
  readonly userName: string;
  readonly email: string;
  readonly account: string;
  readonly password: string;
}

export default CommentSchema;
