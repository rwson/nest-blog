import React from 'react';
import { Global, css } from '@emotion/react';
import { IncomingHttpHeaders } from 'http';
import Head from 'next/head';
import App, { AppContext, AppInitialProps } from 'next/app';

import detector from 'detector';

import BlogLayout from '@/client/blog/layout';
import { wrapper, getStoreInstance } from '@/client/redux/store';
import { fetchUserInfo } from '@/client/redux/store/slices/user';

import cssStr from './css';

type AppProps = {
  [key: string]: any;
} & AppInitialProps;

class BlogApp extends App<AppProps> {
  async componentDidMount() {
    const { props: {
      tokenInfo: {
        token
      }, isAdmin
    } } = this;
    const store = getStoreInstance();
    const storeState = store.getState();
    const { userInfo: {
      info
    } } = storeState;
    const logined: Boolean = Boolean(Object.keys(info).length);
    const localToken: string | null = localStorage.getItem('blog_app_user-token');

    if (!isAdmin) {
      if (token) {
        localStorage.setItem('blog_app_user-token', token);
      } else {
        if (!logined && localToken) {
          const { payload } = await store.dispatch(fetchUserInfo({
            authorization:localToken
          }));

          if (Boolean(Object.keys(payload).length)) {
            localStorage.setItem('blog_app_user-token', payload.token);
          }
          return;
        }
        localStorage.removeItem('blog_app_user-token');
      }
    }
  }

  render() {
    const {
      Component,
      isAdmin,
      isMobile,
      deviceInfo
    }: any = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            href="https://cdn.bootcdn.net/ajax/libs/antd/4.9.3/antd.min.css"
            rel="stylesheet"
          />
          {isAdmin ? (
            <link
              href="https://cdn.bootcdn.net/ajax/libs/KaTeX/0.12.0/katex.min.css"
              rel="stylesheet"
            />
          ) : (
            <>
              <link
                href="https://at.alicdn.com/t/font_1449908_kdwhnxbkbl.css"
                rel="stylesheet"
              />
              <script src="https://at.alicdn.com/t/font_1449908_kdwhnxbkbl.js"></script>
            </>
          )}
        </Head>
        {isAdmin ? (
          <Component />
        ) : (
          <BlogLayout isMobile={isMobile} deviceInfo={deviceInfo}>
            <Global styles={css(cssStr)} />
            <Component />
          </BlogLayout>
        )}
      </>
    );
  }
}

BlogApp.getInitialProps = wrapper.getInitialAppProps((store: any) => async(appContext: AppContext) => {
  const appProps: AppInitialProps = await App.getInitialProps(appContext);
  const headers: Partial<IncomingHttpHeaders> = appContext.ctx.req?.headers ?? {};
  const { pathname, query } = appContext.router;
  const isAdmin: boolean = pathname.includes('/admin/console') || pathname.includes('/admin/login');
  const userAgent: string = headers['user-agent'];
  const deviceInfo = detector.parse(userAgent);
  const osName: string = deviceInfo.os.name;
  const isMobile: boolean = osName === 'ios' || osName === 'android';
  const props = {
    ...appProps,
    deviceInfo,
    isAdmin,
    isMobile,
    tokenInfo: {}
  };

  if (!isAdmin && query.token) {
    const res = await store.dispatch(fetchUserInfo({
      authorization: query.token as string
    }));
    props.tokenInfo = res.payload;
  }

  return props;
});

export default wrapper.withRedux(BlogApp);
