import { Document } from 'mongoose';

export default interface BaseDocument extends Document {
  readonly _id: string;
  readonly createdAt: string | Date;
  readonly updatedAt: string | Date;
}
