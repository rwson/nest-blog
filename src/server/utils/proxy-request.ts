import axios, { AxiosResponse } from 'axios';
import { stringify } from 'query-string';

import { PROXY_API_GATEWAY } from '@/server/config';

type FreeType = {
  [key: string]: any;
} | any;

type RequestMeta = Partial<{
  url: string;
  method: string; 
  body: FreeType;
  headers: FreeType;
  params: FreeType;
}>;

interface ProxyRequestInterface {
  requestApi<T>(meta): Promise<AxiosResponse<T>>;
}

export default class ProxyRequest implements ProxyRequestInterface {

  public async requestApi<T = any>(meta: RequestMeta): Promise<T> {
    console.log(JSON.stringify(meta));
    const res: AxiosResponse<T> = await axios({
      url: PROXY_API_GATEWAY,
      method: 'POST',
      data: JSON.stringify(meta)
    });

    return res.data as T;
  }

}
