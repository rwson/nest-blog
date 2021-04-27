import React from 'react';
import { NextPage, NextPageContext } from 'next';

import { wrapper } from '@/client/redux/store';
import ArticleDetail from '@/client/blog/pages/article/detail';
import { fetchArticleDetail } from '@/client/redux/store/slices/article-detail';

const ArticleDetailPage: NextPage = (props) => {
  return <ArticleDetail {...props} />;
};

ArticleDetailPage.getInitialProps = wrapper.getInitialPageProps((store: any) => async(ctx: NextPageContext) => {
  const id = ctx.query.id as string;
  const res = await store.dispatch(fetchArticleDetail(id));
  return {};
});

export default ArticleDetailPage;
