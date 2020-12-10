import axios, { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios';

import { message } from 'antd';

import { baseUrl as baseURL } from '@/client/api';

const instance: AxiosInstance = axios.create({
  baseURL
});

type HttpResponse<T> = {
  code: number;
  message: string;
  data: T;
};

instance.interceptors.response.use((res) => {
  if (res.data.code !== 1) {
    message.error(res.data.message);
  }

  return res.data;
});

const autoHeader = () => {
  const authorization = localStorage.getItem('blog_app_user-token');
  return {
    authorization
  };
};

class Http {

  async get<T>(url: string, params: any): Promise<HttpResponse<T>> {
    return instance.get(url, {
      params,
      headers: autoHeader()
    });
  }

  async post<T>(url: string, data: any): Promise<HttpResponse<T>> {
    return instance.get(url, {
      data,
      headers: autoHeader()
    });
  }

  async put<T>(url: string, data: any): Promise<HttpResponse<T>> {
    return instance.put(url, {
      data,
      headers: autoHeader()
    });
  }

  async delete<T>(url: string, data: any): Promise<HttpResponse<T>> {
    return instance.delete(url, {
      data,
      headers: autoHeader()
    });
  }

}

export default new Http;

