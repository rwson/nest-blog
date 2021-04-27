import { createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import oauthService, { GetUserInfoHeader } from '@/client/services/oauth';
import { ArticleDetailData } from '@/dto/article/response';
import hydrate from '@/client/redux/hydrate';

const initialState = {
  info: {}
};

export const fetchUserInfo = createAsyncThunk<
  ArticleDetailData,
  GetUserInfoHeader
>('FETCH_USER_INFO', async (header: GetUserInfoHeader) => {
  const res = await oauthService.getUserInfo(header);
  return res.data;
});

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {},
  extraReducers(builder: ActionReducerMapBuilder<typeof initialState>) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...(action.payload ?? {})[userSlice.name] ?? {},
      };
    });

    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.info = action.payload;
    });
  },
});

export default userSlice;
