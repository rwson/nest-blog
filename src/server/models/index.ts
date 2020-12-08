import { model } from 'mongoose';

import { MONGODB } from '@/server/config';

import ArticleSchema, { ArticleDocument } from './article';
import CategorySchema, { CategoryDocument } from './category';
import CommentSchema, { CommentDocument } from './comment';
import FileSchema, { FileDocument } from './file';
import UserSchema, { UserDocument } from './user';

export const ArticleModel = model<ArticleDocument>('article', ArticleSchema, 'article');
export const CategoryModel = model<CategoryDocument>('category', CategorySchema, 'category');
export const CommentModel = model<CommentDocument>('comment', CommentSchema, 'comment');
export const FileModel = model<FileDocument>('file', FileSchema, 'file');
export const UserModel = model<UserDocument>('user', UserSchema, 'user');

export const ArticleModelProvider = {
  useValue: ArticleModel,
  provide: `${ArticleModel.modelName}${MONGODB.token}`
};
export const CategoryModelProvider = {
  useValue: CategoryModel,
  provide: `${CategoryModel.modelName}${MONGODB.token}`
};
export const CommentModelProvider = {
  useValue: CommentModel,
  provide: `${CommentModel.modelName}${MONGODB.token}`
};
export const FileModelProvider = {
  useValue: FileModel,
  provide: `${FileModel.modelName}${MONGODB.token}`
};
export const UserModelProvider = {
  useValue: UserModel,
  provide: `${UserModel.modelName}${MONGODB.token}`
};

export type ArticleInterface = typeof ArticleModel;
export type CategoryInterface = typeof CategoryModel;
export type CommentInterface = typeof CommentModel;
export type FileInterface = typeof FileModel;
export type UserInterface = typeof UserModel;
