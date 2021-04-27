import { viewApis } from '@/client/api';
import Http, { HttpResponse } from '@/client/http';

import { ArticleDetailData } from '@/dto/article/response';

interface ArticleDetailInterface {
  getDetail(id: string): Promise<HttpResponse<ArticleDetailData>>;
};

class ArticleDetailService implements ArticleDetailInterface {
  getDetail(id: string): Promise<HttpResponse<ArticleDetailData>> {
    return Http.get<ArticleDetailData>(viewApis.article.detail(id));
  }
}

export default new ArticleDetailService;

