import axios, { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios';

import { message } from 'antd';

import { baseUrl as baseURL } from '@/client/api';

import appStore from '@/client/store';

const instance: AxiosInstance = axios.create({
  baseURL,
});

type HttpResponse<T> = {
  code: number;
  message: string;
  data: T;
};

instance.interceptors.response.use((res) => {
  if (res.data.code !== 1) {
    message.destroy();
    message.error(res.data.message);
  }

  return res.data;
});

const autoHeader = () => {
  const authorization = localStorage.getItem('blog_app_user-token');
  return {
    authorization,
  };
};

class Http {
  async get<T>(url: string, params: any = {}): Promise<HttpResponse<T>> {
    const res: HttpResponse<T> = await instance.get(url, {
      params,
      headers: autoHeader(),
    });
    return res;
  }

  async post<T>(url: string, data: any = {}): Promise<HttpResponse<T>> {
    const res: HttpResponse<T> = await instance.post(url, data, {
      headers: {
        ...autoHeader(),
      },
    });
    return res;
  }

  async put<T>(url: string, data: any = {}): Promise<HttpResponse<T>> {
    const res: HttpResponse<T> = await instance.put(url, data, {
      headers: {
        ...autoHeader(),
      },
    });
    return res;
  }

  async delete<T>(url: string): Promise<HttpResponse<T>> {
    const res: HttpResponse<T> = await instance.delete(url, {
      headers: {
        ...autoHeader(),
      },
    });
    return res;
  }
}

export default new Http();
