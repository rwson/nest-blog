import React from 'react';

import { useHistory } from 'react-router-dom';

import { css } from '@emotion/react';

import { Modal, Form, Input, Button, Divider, Collapse, Pagination, message } from 'antd';

import PageHeaderStyled from '@/client/admin/components/page-header';
import FormItemStyled from '@/client/admin/components/form-item';

import {
  CommentItem,
  CommentWithArticle,
  CommentListData
} from '@/dto/comment/response';

import Http from '@/client/http';

import { comment } from '@/client/api';

import RenderComment from './render-comment';

import { CommentListContainer } from './style';

type CommentListState = {
  comments: Array<CommentWithArticle>;
  currentPage: number;
  totalPages: number;
  total: number;
};

const CommentList: React.FC = () => {
  const history = useHistory();

  const [form] = Form.useForm();

  const mounted = React.useRef<boolean>(false);

  const tableHeight = React.useRef<number>(document.body.clientHeight - 335);

  const [ state, setState ] = React.useState<CommentListState>({
    comments: [],
    currentPage: 1,
    totalPages: 1,
    total: 1
  });

  const queryComments = React.useCallback(async(page?: number) => {
    const res = await Http.get<CommentListData>(comment.list, {
      page: page ?? state.currentPage,
      pageSize: 10
    });

    if (res.code === 1) {
      const data: CommentListData = res.data;

      const comments = 

      setState((state: CommentListState): CommentListState => {
        return {
          ...state,
          comments: data.data,
          total: data.total,
          currentPage: data.currentPage,
          totalPages: data.totalPages
        };
      });
    }
  }, [state]);

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      queryComments();
    }
  }, [mounted, queryComments]);

  return (
    <div>
      <PageHeaderStyled
        onBack={history.goBack}
        title="评论列表"
      />
      <CommentListContainer
        style={{
          maxHeight: `${tableHeight.current}px`
        }}
      >
        {
          state.comments.map((article: CommentWithArticle) => {
            return (
              <Collapse key={article.id}>
                <Collapse.Panel 
                  header={article.title}
                  extra={`${article.comments.length}条评论`}
                  key={article.id}>
                  <RenderComment comments={article.comments} />
                </Collapse.Panel>
              </Collapse>
            );
          })
        }
      </CommentListContainer>
    </div>
  );
};

export default React.memo(CommentList);
