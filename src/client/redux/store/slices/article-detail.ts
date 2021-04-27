import { createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import articleDetailService from '@/client/services/article-detail';
import { ArticleDetailData } from '@/dto/article/response';
import hydrate from '@/client/redux/hydrate';

const initialState = {
  detail: {},
};

export const fetchArticleDetail = createAsyncThunk<
  ArticleDetailData,
  string
>('UPDATE_ARTICLE_DETAIL', async (id: string) => {
  const res = await articleDetailService.getDetail(id);
  return res.data;
});

const articleDetailSlice = createSlice({
  name: 'articleDetail',
  initialState,
  reducers: {},
  extraReducers(builder: ActionReducerMapBuilder<typeof initialState>) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...(action.payload ?? {})[articleDetailSlice.name] ?? {},
      };
    });

    builder.addCase(fetchArticleDetail.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
  },
});

export default articleDetailSlice;
