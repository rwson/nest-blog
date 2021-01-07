import React from 'react';

import { Global, css } from '@emotion/react';

import Router from 'next/router';
import Head from 'next/head';
import App, { AppContext, AppInitialProps } from 'next/app';

import { Provider } from 'mobx-react';

import detector from 'detector';

import BlogLayout from '@/client/blog/layout';

import AppStore, { fetchInitialStoreState, Store } from '@/client/store';

import cssStr from './css';

type AppProps = {
  [key: string]: any;
} & AppInitialProps;

type AppState = {
  store: Store;
};

class BlogApp extends App {
  state = {
    store: AppStore,
  };

  static async getInitialProps(appContext: AppContext): Promise<AppProps> {
    const appProps: AppInitialProps = await App.getInitialProps(appContext);
    const isAdmin: boolean = appContext.ctx.pathname.includes('/admin/console');

    let initialStoreState: {
      [key: string]: any;
    } = {};

    const { pathname, query } = appContext.router;
    const userAgent: string = appContext.ctx.req.headers['user-agent'];
    const deviceInfo = detector.parse(userAgent);
    const osName: string = deviceInfo.os.name;

    const isMobile: boolean = osName === 'ios' || osName === 'android';

    if (!isAdmin) {
      initialStoreState = await fetchInitialStoreState({
        pathname,
        query,
      });
    }

    return {
      ...appProps,
      deviceInfo: deviceInfo,
      initialStoreState,
      isAdmin,
      isMobile,
    };
  }

  static getDerivedStateFromProps(props: AppProps, state: AppState) {
    state.store.hydrate(props.initialStoreState);
    return state;
  }

  render() {
    const {
      Component,
      pageProps,
      isAdmin,
      isMobile,
      deviceInfo,
    }: any = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          {isAdmin ? (
            <>
              <link
                href="https://cdn.bootcdn.net/ajax/libs/antd/4.9.3/antd.min.css"
                rel="stylesheet"
              />
              <link
                href="https://cdn.bootcdn.net/ajax/libs/KaTeX/0.12.0/katex.min.css"
                rel="stylesheet"
              />
            </>
          ) : (
            <>
              <link
                href="https://cdn.bootcdn.net/ajax/libs/KaTeX/0.12.0/katex.min.css"
                rel="stylesheet"
              />
              <link
                href="https://at.alicdn.com/t/font_1449908_cyl82tqht69.css"
                rel="stylesheet"
              />
            </>
          )}
        </Head>
        {isAdmin ? (
          <Component />
        ) : (
          <BlogLayout isMobile={isMobile} deviceInfo={deviceInfo}>
            <Global styles={css(cssStr)} />
            <Provider store={this.state.store}>
              <Component {...pageProps} />
            </Provider>
          </BlogLayout>
        )}
      </>
    );
  }
}

export default BlogApp;
