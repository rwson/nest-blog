import React from 'react';

import { useHistory } from 'react-router-dom';

import { Modal, Table, Button, Divider, Tag } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';

import PageHeaderStyled from '@/client/admin/components/page-header';

import { QueryTagArticleData, ArticleDetailData, ArticleDetailTag, ArticleDetailCategory, ArticleDetailCreator } from '@/dto/article/response';

import Http from '@/client/http';

import { article } from '@/client/api';

type ArticleListState = {
  loading: boolean;
  articles: Array<ArticleDetailData>;
  currentPage: number;
  totalPages: number;
  total: number;
};

const ArticleList: React.FC = () => {
  const history = useHistory();

  const mounted = React.useRef<boolean>(false);

  const tableHeight = React.useRef<number>(document.body.clientHeight - 335);

  const [state, setState] = React.useState<ArticleListState>({
    loading: false,
    articles: [],
    totalPages: 1,
    currentPage: 1,
    total: 0,
  });

  const toUrl = React.useCallback(
    (url: string) => {
      history.push(url);
    },
    [history],
  );

  const queryArticles = React.useCallback(async(page?: number) => {
    setState((state: ArticleListState): ArticleListState => {
      return {
        ...state,
        loading: true
      };
    });

    const res = await Http.get<QueryTagArticleData>(article.list('online'), {
      page: page ?? state.currentPage,
      pageSize: 10
    });

    if (res.code === 1) {
      const data: QueryTagArticleData = res.data;

      setState((state: ArticleListState): ArticleListState => {
        return {
          ...state,
          loading: false,
          articles: data.data,
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          total: data.total,
        };
      });
    }
  }, [state]);

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      queryArticles();
    }
  }, [mounted, queryArticles]);

  const columns = React.useMemo<Array<ColumnType<ArticleDetailData>>>(() => {
    return [
      {
        title: '标签名称',
        dataIndex: 'title',
        key: 'id',
      },
      {
        title: '标签',
        dataIndex: 'tags',
        key: 'id',
        render: (tags: Array<ArticleDetailTag>) => {
          if (!tags.length) {
            return '-';
          }

          return (
            <>
              {
                tags.map((tag: ArticleDetailTag, index: number) => {
                  return (
                    <Tag color={tag.color} key={`${tag.color}-${index}`}>
                      {tag.title}
                    </Tag>
                  );
                })
              }
            </>
          );
        }
      },
      {
        title: '分类',
        dataIndex: 'category',
        key: 'id',
        render: (category: ArticleDetailCategory) => {
          return category?.title ?? '-';
        }
      },
      {
        title: '阅读量',
        dataIndex: 'viewsCount',
        key: 'id',
      },
      {
        title: '评论量',
        dataIndex: 'commentCount',
        key: 'id',
      },
      {
        title: '创建人',
        key: 'id',
        dataIndex: 'creator',
        render: (creator: ArticleDetailCreator) => creator.userName,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'id',
      },
      {
        title: '操作',
        key: 'id',
        render: (text: string, row: ArticleDetailData) => (
          <>
            <Button size="small">
              修改
            </Button>
            <Divider type="vertical" />
            <Button danger size="small">
              删除
            </Button>
          </>
        ),
      },
    ];
  }, []);

  const pagination = React.useMemo<TablePaginationConfig>(() => {
    return {
      total: state.total,
      current: state.currentPage,
      pageSize: 10,
      onChange: queryArticles,
    };
  }, [state, queryArticles]);

  return (
    <div>
      <PageHeaderStyled
        onBack={history.goBack}
        title="文章列表"
        extra={[
          <Button
            type="primary"
            key="add-article"
            onClick={() => toUrl('/article/publish')}
          >
            发布文章
          </Button>,
          <Button key="draft" onClick={() => toUrl('/article/draft-list')}>
            草稿箱
          </Button>,
          <Button key="rubbish" onClick={() => toUrl('/article/rubbish-list')}>
            垃圾箱
          </Button>
        ]}
      />
      <Table
        bordered={true}
        loading={state.loading}
        dataSource={state.articles}
        columns={columns}
        pagination={pagination}
        rowKey={(row: ArticleDetailData) => row.id}
        scroll={{
          y: tableHeight.current,
        }}
      />
    </div>
  );
};

export default React.memo(ArticleList);
