import axios, { AxiosInstance, AxiosResponse } from 'axios';
import isNode from 'detect-node';

import { message } from 'antd';

import { baseUrl as baseURL } from '@/client/api';

export type HttpResponse<T = any> = {
  code: number;
  message: string;
  data: T;
};

interface HttpInterface {
  get<T>(url: string, params: any, headers: any): Promise<HttpResponse<T>>;
  post<T>(url: string, data: any, headers: any): Promise<HttpResponse<T>>;
  put<T>(url: string, data: any, headers: any): Promise<HttpResponse<T>>;
  upload<T>(url: string, data: any, headers: any): Promise<HttpResponse<T>>;
  delete<T>(url: string, headers: any): Promise<HttpResponse<T>>;
}

const instance: AxiosInstance = axios.create({
  baseURL,
});

instance.interceptors.response.use((res: AxiosResponse<HttpResponse>): any => {
  if (res.data.code !== 1 && !isNode) {
    message.destroy();
    message.error(res.data.message);
  }

  return res.data;
});

const autoHeader = () => {
  if (isNode) {
    return {};
  }
  const authorization = localStorage.getItem('blog_app_user-token');
  return {
    authorization,
  };
};

class Http implements HttpInterface {
  async get<T>(url: string, params: any = {}, headers: any = {}): Promise<HttpResponse<T>> {
    const res: HttpResponse<T> = await instance.get(url, {
      params,
      headers: {
        ...autoHeader(),
        ...headers
      }
    });
    return res;
  }

  async post<T>(url: string, data: any = {}, headers: any = {}): Promise<HttpResponse<T>> {
    const res: HttpResponse<T> = await instance.post(url, data, {
      headers: {
        ...autoHeader(),
        ...headers
      }
    });
    return res;
  }

  async put<T>(url: string, data: any = {}, headers: any = {}): Promise<HttpResponse<T>> {
    const res: HttpResponse<T> = await instance.put(url, data, {
      headers: {
        ...autoHeader(),
        ...headers
      }
    });
    return res;
  }

  async upload<T>(url: string, data: any = {}, headers: any = {}): Promise<HttpResponse<T>> {
    const form = new FormData();
    Object.keys(data).forEach((key: string) => {
      form.append(key, data[key]);
    });
    const res: HttpResponse<T> = await instance.post(url, form, {
      headers: {
        ...autoHeader(),
        ...headers,
        'content-type': 'multipart/form-data;'
      },
    });
    return res;
  }

  async delete<T>(url: string, headers: any = {}): Promise<HttpResponse<T>> {
    const res: HttpResponse<T> = await instance.delete(url, {
      headers: {
        ...autoHeader(),
        ...headers
      },
    });
    return res;
  }
}

export default new Http();
