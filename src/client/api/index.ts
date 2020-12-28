import { isDev } from '@/server/config';

export const baseUrl = isDev ? 'http://localhost:3001' : '';

export const user = {
  login: '/user/login',
  checkLogin: '/user/check-login',
};

export const tag = {
  list: '/tag/list',
  listAll: '/tag/list-all',
  create: '/tag/create-tag',
  update: '/tag/update-tag',
  detail: (id: string): string => `/tag/detail/${id}`,
  delete: (id: string): string => `/tag/delete-tag/${id}`,
};

export const category = {
  list: '/category/list',
  listAll: '/category/list-all',
  create: '/category/create-category',
  update: '/category/update-category',
  detail: (id: string): string => `/category/detail/${id}`,
  delete: (id: string): string => `/category/delete-category/${id}`,
};

export const article = {
  list: (type: 'rubbish' | 'online' | 'draft') => `/article/list/${type}`,
  create: '/article/create-article',
  update: '/article/update-article',
  detail: (id: string): string => `/article/detail/${id}`,
  delete: (id: string): string => `/article/delete-category/${id}`,
};

export const file = {
  upload: '/file/upload',
  library: '/file/library',
  detail: (id: string): string => `${baseUrl}/file/get-file/${id}`,
  delete: (id: string): string => `/file/delete-file/${id}`,
};