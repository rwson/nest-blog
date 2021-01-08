import { observable, action, configure, makeObservable, extendObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react';

import { viewApis } from '@/client/api';
import Http from '@/client/http';

import { ArticleDetailData } from '@/dto/article/response';
import { CategoryListItem } from '@/dto/category/response';
import { TagListItem } from '@/dto/tag/response';

type ActionType = 'updateArticleDetail' | 'updateArticleList' | 'updateTagDetail' | 'updateTagList' | 'updateCategoryDetail' | 'updateCategoryList';

type MethodType = 'get' | 'post' | 'put' | 'delete';

type FetchInitialStoreStateParams = {
  pathname?: string;
  query?: {
    [key: string]: any;
  };
};

type SerializedStore = {
  actionType?: ActionType;
  data?: any;
  articleDetail?: ArticleDetailData;
  articleList?: Array<ArticleDetailData>;
  categoryDetail?: CategoryListItem;
  categoryList?: Array<CategoryListItem>;
  tagDetail?: TagListItem;
  tagList?: Array<TagListItem>;
  pageInfo: FetchInitialStoreStateParams;
};

type StoreState = {
  articleDetail?: ArticleDetailData;
  articleList?: Array<ArticleDetailData>;
  categoryDetail?: CategoryListItem;
  categoryList?: Array<CategoryListItem>;
  tagDetail?: TagListItem;
  tagList?: Array<TagListItem>;
};

type ApiItem = {
  actionType: ActionType;
  method: MethodType;
  url: (param?: string | number) => string;
};

type ApiObjects = {
  [key: string]: ApiItem;
};

const apis: ApiObjects = {
  '/blog': {
    actionType: 'updateArticleList',
    method: 'get',
    url: (page: number) => viewApis.article.list(page)
  },
  '/blog/[id]': {
    actionType: 'updateArticleDetail',
    method: 'get',
    url: (id: string): string => viewApis.article.detail(id)
  },
  '/blog/category/[id]': {
    actionType: 'updateCategoryDetail',
    method: 'get',
    url: (id: string): string => viewApis.tag.detail(id)
  },
  '/blog/tag/[id]': {
    actionType: 'updateTagDetail',
    method: 'get',
    url: (id: string): string => viewApis.tag.detail(id),
  }
};

configure({enforceActions: 'observed'});
enableStaticRendering(true);

export const fetchInitialStoreState = async ({ query, pathname }: FetchInitialStoreStateParams): Promise<SerializedStore> => {
  const apiItem: ApiItem = apis[pathname];

  if (apiItem) {
    const { url, actionType, method } = apiItem;
    const api: string = url(query.id || query.page);
    const res = await (Http[method] as any)(api);
  
    if (res.code === 1) {
      return {
        actionType,
        data: res.data,
        pageInfo: {
          query, pathname
        }
      };
    }
  }

  return {
    pageInfo: {
      query, pathname
    }
  };
}

export class Store {
  @observable
  data: StoreState = {};

  @observable
  count = 1;

  @observable
  pageInfo: FetchInitialStoreStateParams = {};

  constructor() {
    makeObservable(this);
    // this.data = {};
    // this.pageInfo = {};
    // this.count = 1;
  }

  @action
  hydrate = (serializedStore: SerializedStore) => {
    const { actionType, pageInfo, data: storeData } = serializedStore;

    this.pageInfo = pageInfo;

    switch (actionType) {
      case 'updateArticleDetail':
        this.data.articleDetail = storeData;
      break;
    }
  }

  @action
  reloadDetail = async (pageInfo: FetchInitialStoreStateParams) => {
    const serializedStore = await fetchInitialStoreState(pageInfo);
    this.hydrate(serializedStore);
  }

  @action
  addCount() {
    this.count = this.count + 1;
  }
}

const store = new Store();

export type PageBaseProps = {
  store?: typeof store;
};

export default store;
