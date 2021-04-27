import { configureStore, ThunkAction, EnhancedStore } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import articleDetailSlice from './slices/article-detail';
import userSlice from './slices/user';

let store;

export const makeStore = (): EnhancedStore => {
  store = configureStore({
    reducer: {
      [articleDetailSlice.name]: articleDetailSlice.reducer,
      [userSlice.name]: userSlice.reducer,
    },
  });

  return store;
};

export const getStoreInstance = (): EnhancedStore => {
  if (!store) {
    store = makeStore();
  }
  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
>;

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: false,
});
