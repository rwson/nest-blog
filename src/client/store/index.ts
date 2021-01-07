import Router from 'next/router';

import { observable, action } from 'mobx';
import { enableStaticRendering } from 'mobx-react';

import { viewApis } from '@/client/api';
import Http from '@/client/http';

import { ArticleDetailData } from '@/dto/article/response';
import { CategoryListItem } from '@/dto/category/response';
import { TagListItem } from '@/dto/tag/response';

type ActionType = 'updateArticleDetail' | 'updateArticleList' | 'updateTagDetail' | 'updateTagList' | 'updateCategoryDetail' | 'updateCategoryList';

type MethodType = 'get' | 'post' | 'put' | 'delete';

type FetchInitialStoreStateParams = {
  pathname: string;
  query: {
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

enableStaticRendering(true);

export class Store {
  @observable
  data: StoreState = {};

  @action
  hydrate(serializedStore: SerializedStore) {
    const { actionType, data: storeData } = serializedStore;

    let data = this.data;

    switch (actionType) {
      case 'updateArticleDetail':
        this.data.articleDetail = storeData;
      break;
    }
  }
}

const store = new Store();

export type PageBaseProps = {
  store?: typeof store;
};

export const fetchInitialStoreState = async ({ query, pathname }: FetchInitialStoreStateParams): Promise<SerializedStore> => {
  const apiItem: ApiItem = apis[pathname];

  if (apiItem) {
    const { url, actionType, method } = apiItem;
    const api: string = url(query.id || query.page);
    const res = await (Http[method] as any)(api);
  
    if (res.code === 1) {
      return {
        actionType,
        data: res.data
      };
    } else {
      return {};
    }
  }

  return {};
}

export default store;
