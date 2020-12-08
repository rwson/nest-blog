import { Schema } from 'mongoose';

import BaseDocument from './base-document';

const CategorySchema = new Schema(
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
});;

export interface CategoryDocument extends BaseDocument {
  readonly title: string;
}

export default CategorySchema;
