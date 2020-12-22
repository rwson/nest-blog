import React from 'react';

import Head from 'next/head';
import App, { AppContext, AppInitialProps } from 'next/app';

import { Provider } from 'mobx-react';

import AppStore, { fetchInitialStoreState, Store } from '@/client/store';

const isServer = typeof window === 'undefined';

type AppProps = {
  [key: string]: any;
} & AppInitialProps;

type AppState = {
  store: Store;
};

class CustomApp extends App {
  state = {
    store: AppStore,
  };

  static async getInitialProps(appContext: AppContext): Promise<AppProps> {
    const appProps = await App.getInitialProps(appContext);
    const initialStoreState = await fetchInitialStoreState();

    return {
      ...appProps,
      initialStoreState,
    };
  }

  static getDerivedStateFromProps(props: AppProps, state: AppState) {
    state.store.hydrate(props.initialStoreState);
    return state;
  }

  render() {
    const { Component, pageProps }: any = this.props;

    return (
      <Provider store={this.state.store}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default CustomApp;
