import { isDev } from '@/server/config';

export const baseUrl = 'http://localhost:3001';

export const user = {
  login: '/user/login',
  checkLogin: '/user/check-login',
};

export const tag = {
  list: '/tag/list',
  create: '/tag/create-tag',
  update: '/tag/update-tag',
  detail: (id: string): string => `/tag/detail/${id}`,
  delete: (id: string): string => `/tag/delete-tag/${id}`,
};

export const category = {
  list: '/category/list',
  create: '/category/create-category',
  update: '/category/update-category',
  detail: (id: string): string => `/category/detail/${id}`,
  delete: (id: string): string => `/category/delete-tag/${id}`,
};
