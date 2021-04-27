import { AppState } from '@/client/redux/store';
import { ArticleDetailData } from '@/dto/article/response';
import { OAuthLoginData } from '@/dto/oauth/response';

export const selectRootState = (state): AppState => state;
export const selectArticleDetail = (state): Partial<ArticleDetailData> => state.articleDetail?.detail ?? {};
export const selectOAuthUserInfo = (state): Partial<OAuthLoginData> => state.userInfo?.info ?? {};
export const selectOAuthLogined = (state): Boolean => Boolean(Object.keys(state.userInfo?.info ?? {}).length);